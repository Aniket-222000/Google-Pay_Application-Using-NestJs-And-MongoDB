// src/notification/notification.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter;
  private logger = new Logger(NotificationService.name);

  constructor() {
    // Set up the transporter using Gmail SMTP.
    // In production, secure credentials (or use OAuth2) and environment variables.
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'yourgmail@gmail.com',        // Your Gmail address
        pass: 'your_gmail_password_or_app_password', // Your Gmail password or app-specific password
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: '"GooglePay App" <yourgmail@gmail.com>',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (err) {
      this.logger.error(`Failed to send email: ${err.message}`);
      // Optionally throw an exception or handle error appropriately
    }
  }
}
