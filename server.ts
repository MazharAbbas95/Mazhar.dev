import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Simple in-memory IP rate limiting for contact submissions (5 requests per 10 minutes)
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 5;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) ?? []).filter((t) => now - t < rateLimitWindowMs);
  if (timestamps.length >= rateLimitMax) {
    ipRequests.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

function isEmailProviderConfigured(): boolean {
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0) {
    return true;
  }
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_HOST.trim().length > 0
  ) {
    return true;
  }
  return false;
}

function stripHeaderControls(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function startServer(): Promise<void> {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      emailConfigured: isEmailProviderConfigured(),
    });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
      if (isRateLimited(clientIp)) {
        res.status(429).json({
          ok: false,
          error: 'Too many requests. Please wait a few minutes before sending another message.',
        });
        return;
      }

      const body = req.body as Record<string, unknown>;
      const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
      if (honeypot.length > 0) {
        // Spam trap triggered
        res.status(400).json({
          ok: false,
          error: 'Invalid submission.',
        });
        return;
      }

      const rawName = typeof body.name === 'string' ? stripHeaderControls(body.name) : '';
      const rawEmail = typeof body.email === 'string' ? stripHeaderControls(body.email) : '';
      const rawSubject = typeof body.subject === 'string' ? stripHeaderControls(body.subject) : '';
      const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';

      if (rawName.length < 2 || rawName.length > 100) {
        res.status(400).json({ ok: false, error: 'Please provide your full name (2–100 characters).' });
        return;
      }
      if (!EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254) {
        res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
        return;
      }
      if (rawSubject.length < 2 || rawSubject.length > 150) {
        res.status(400).json({ ok: false, error: 'Please provide a subject (2–150 characters).' });
        return;
      }
      if (rawMessage.length < 10 || rawMessage.length > 3000) {
        res.status(400).json({ ok: false, error: 'Please provide a message (10–3000 characters).' });
        return;
      }

      const recipientEmail = process.env.CONTACT_TO_EMAIL?.trim() || 'mazharabbasawan95@gmail.com';
      const resendKey = process.env.RESEND_API_KEY?.trim();

      if (resendKey) {
        const fromAddress =
          process.env.CONTACT_FROM_EMAIL?.trim() || 'Portfolio Contact <onboarding@resend.dev>';
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [recipientEmail],
            reply_to: rawEmail,
            subject: `[Portfolio] ${rawSubject}`,
            text: `Name: ${rawName}\nEmail: ${rawEmail}\nSubject: ${rawSubject}\n\nMessage:\n${rawMessage}`,
          }),
        });

        if (!response.ok) {
          const errorDetail = await response.text();
          console.error('Resend API error:', response.status, errorDetail);
          res.status(502).json({
            ok: false,
            error: 'Email service rejected the delivery request. Please email mazharabbasawan95@gmail.com directly.',
          });
          return;
        }

        res.status(200).json({
          ok: true,
          message: 'Your message has been delivered successfully. Thank you for reaching out!',
        });
        return;
      }

      const smtpHost = process.env.SMTP_HOST?.trim();
      const smtpUser = process.env.SMTP_USER?.trim();
      const smtpPass = process.env.SMTP_PASS?.trim();

      if (smtpHost && smtpUser && smtpPass) {
        const smtpPort = Number(process.env.SMTP_PORT || 587);
        const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const fromAddress = process.env.CONTACT_FROM_EMAIL?.trim() || smtpUser;

        await transporter.sendMail({
          from: `"${rawName.replace(/"/g, '')}" <${fromAddress}>`,
          to: recipientEmail,
          replyTo: rawEmail,
          subject: `[Portfolio] ${rawSubject}`,
          text: `Name: ${rawName}\nEmail: ${rawEmail}\nSubject: ${rawSubject}\n\nMessage:\n${rawMessage}`,
        });

        res.status(200).json({
          ok: true,
          message: 'Your message has been delivered successfully. Thank you for reaching out!',
        });
        return;
      }

      res.status(503).json({
        ok: false,
        configured: false,
        error:
          'Direct form email delivery is awaiting server credentials (RESEND_API_KEY or SMTP settings). Please use the direct email option below to send your message immediately.',
      });
    } catch (err) {
      console.error('Contact route error:', err);
      res.status(500).json({
        ok: false,
        error: 'An unexpected error occurred while sending your message. Please email mazharabbasawan95@gmail.com directly.',
      });
    }
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
