import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async recordTransaction(data: Partial<Transaction>): Promise<Transaction> {
    const txn = this.transactionRepository.create(data);
    return this.transactionRepository.save(txn);
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { userId } });
  }

  async getAll(query: any = {}): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async flagTransaction(id: string, flag: boolean): Promise<Transaction> {
    const objectId = new ObjectId(id);
    const transaction = await this.transactionRepository.findOne({ where: { _id: objectId } });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    transaction.flagged = flag;
    return this.transactionRepository.save(transaction);
  }

  async getDailyVolume(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const txns = await this.transactionRepository
      .createQueryBuilder()
      .where('createdAt >= :today', { today })
      .getMany();
    return txns.reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
  }
}
