import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  private transporter;
  private logger = new Logger(OtpService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOtpEmail(email: string): Promise<{ otp: string }> {
    const otp = this.generateOtp();
    // (Optional) Store the OTP in your temporary storage/cache for later verification
    const subject = 'Your OTP Code';
    const text = `Your OTP code is ${otp}. It is valid for 5 minutes.`;

    const mailOptions = {
      from: `"Your App" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: email,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`OTP sent successfully to email: ${email}`);
      return { otp }; // Optionally return the OTP for testing purposes (remove in production)
    } catch (error) {
      this.logger.error('Error sending OTP email', error);
      throw new BadRequestException('Failed to send OTP email. Please try again later.');
    }
  }
}
