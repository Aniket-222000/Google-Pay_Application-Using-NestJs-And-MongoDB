import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private transactionService: TransactionService,
  ) {}

  async getWalletByUserId(userId: string): Promise<Wallet> {
    let wallet = await this.walletRepository.findOne({ where: { userId } });
    if (!wallet) {
      wallet = this.walletRepository.create({ userId, balance: 0 });
      wallet = await this.walletRepository.save(wallet);
    }
    return wallet;
  }

  async topUp(userId: string, amount: number): Promise<Wallet> {
    if (amount <= 0) {
      throw new BadRequestException('Top up amount must be positive');
    }
    const wallet = await this.getWalletByUserId(userId);
    wallet.balance += amount;
    await this.walletRepository.save(wallet);
    // Record transaction
    await this.transactionService.recordTransaction({
      type: 'topup',
      userId,
      amount,
      description: 'Wallet Top-up',
    });
    return wallet;
  }

  async withdraw(userId: string, amount: number): Promise<Wallet> {
    if (amount <= 0) {
      throw new BadRequestException('Withdrawal amount must be positive');
    }
    const wallet = await this.getWalletByUserId(userId);
    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }
    wallet.balance -= amount;
    await this.walletRepository.save(wallet);
    await this.transactionService.recordTransaction({
      type: 'withdraw',
      userId,
      amount: -amount,
      description: 'Wallet Withdrawal',
    });
    return wallet;
  }

  // Send money from one user to another by recipient ID
  async sendMoneyByRecipientId(senderId: string, recipientId: string, amount: number): Promise<{ senderWallet: Wallet, recipientWallet: Wallet }> {
    if (amount <= 0) {
      throw new BadRequestException('Transfer amount must be positive');
    }
    const senderWallet = await this.getWalletByUserId(senderId);
    if (senderWallet.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }
    const recipientWallet = await this.getWalletByUserId(recipientId);
    senderWallet.balance -= amount;
    recipientWallet.balance += amount;
    await this.walletRepository.save(senderWallet);
    await this.walletRepository.save(recipientWallet);
    // Record transactions for both parties
    await this.transactionService.recordTransaction({
      type: 'transfer',
      userId: senderId,
      amount: -amount,
      description: `Transferred ${amount} to user ${recipientId}`,
    });
    await this.transactionService.recordTransaction({
      type: 'transfer',
      userId: recipientId,
      amount: amount,
      description: `Received ${amount} from user ${senderId}`,
    });
    return { senderWallet, recipientWallet };
  }

  async adjustBalance(userId: string, amount: number): Promise<Wallet> {
    const wallet = await this.getWalletByUserId(userId);
    wallet.balance += amount;
    await this.walletRepository.save(wallet);
    return wallet;
  }
  
  async getTotalFunds(): Promise<number> {
    const wallets = await this.walletRepository.find();
    return wallets.reduce((sum, w) => sum + w.balance, 0);
  }
  

}
