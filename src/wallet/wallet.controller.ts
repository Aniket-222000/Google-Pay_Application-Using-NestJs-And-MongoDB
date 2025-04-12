import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { TopUpDto } from './dto/topup.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { SendMoneyDto } from './dto/send-money.dto';

@Controller('wallet')
@UseGuards(AuthGuard('jwt'))
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('balance')
  async getBalance(@Req() req) {
    const userId = req.user.userId;
    const wallet = await this.walletService.getWalletByUserId(userId);
    return { balance: wallet.balance };
  }

  @Post('topup')
  async topUp(@Req() req, @Body() topUpDto: TopUpDto) {
    const userId = req.user.userId;
    const wallet = await this.walletService.topUp(userId, topUpDto.amount);
    return { balance: wallet.balance };
  }

  @Post('withdraw')
  async withdraw(@Req() req, @Body() withdrawDto: WithdrawDto) {
    const userId = req.user.userId;
    const wallet = await this.walletService.withdraw(userId, withdrawDto.amount);
    return { balance: wallet.balance };
  }

  @Post('send')
  async sendMoney(@Req() req, @Body() sendMoneyDto: SendMoneyDto) {
    const senderId = req.user.userId;
    const result = await this.walletService.sendMoneyByRecipientId(senderId, sendMoneyDto.recipientId, sendMoneyDto.amount);
    return result;
  }
}
