import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async recordTransaction(data: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionRepository.create(data);
    return this.transactionRepository.save(transaction);
  }

  async getTransactionsByUser(userId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { userId } });
  }

  async getAll(query: any = {}): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }
  
  async flagTransaction(id: string, flag: boolean): Promise<Transaction> {
    // Convert the id string to an ObjectId
    const objectId = new ObjectId(id);
    const transaction = await this.transactionRepository.findOne({ where: { _id: objectId } });
    if (!transaction) throw new NotFoundException('Transaction not found');
    // Set the flagged property. Ideally, the Transaction entity should have a flagged field declared.
    transaction['flagged'] = flag;
    return this.transactionRepository.save(transaction);
  }
  
  async getDailyVolume(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const transactions = await this.transactionRepository
      .createQueryBuilder()
      .where('createdAt >= :today', { today })
      .getMany();
    return transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }
  

}
