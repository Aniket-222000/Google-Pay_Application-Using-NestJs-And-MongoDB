import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('request')
  async requestOtp(@Body('email') email: string): Promise<{ message: string }> {
    await this.otpService.sendOtpEmail(email);
    return { message: 'OTP sent to your email' };
  }

  // Optionally add a verify endpoint here if you implement OTP verification
}
