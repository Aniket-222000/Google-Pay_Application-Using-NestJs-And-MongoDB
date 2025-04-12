import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { GenerateQrDto } from './dto/generate-qr.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('qr-code')
@UseGuards(AuthGuard('jwt'))
export class QrCodeController {
  constructor(private qrCodeService: QrCodeService) {}

  @Post('generate')
  async generateQrCode(@Body() generateQrDto: GenerateQrDto, @Res() res: Response) {
    const qrCodeDataUrl = await this.qrCodeService.generateQrCode(generateQrDto);
    return res.json({ qrCode: qrCodeDataUrl });
  }
}
