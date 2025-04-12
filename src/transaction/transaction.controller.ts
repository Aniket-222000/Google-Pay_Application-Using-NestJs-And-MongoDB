import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaction')
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('history')
  async getTransactionHistory(@Req() req) {
    const userId = req.user.userId;
    const transactions = await this.transactionService.getTransactionsByUser(userId);
    return transactions;
  }
}
