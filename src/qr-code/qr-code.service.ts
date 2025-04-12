import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { GenerateQrDto } from './dto/generate-qr.dto';

@Injectable()
export class QrCodeService {
  async generateQrCode(generateQrDto: GenerateQrDto): Promise<string> {
    // Here we simply encode the JSON string of the passed payload.
    const dataToEncode = JSON.stringify(generateQrDto);
    return QRCode.toDataURL(dataToEncode);
  }
}
