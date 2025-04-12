import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';
import { TransactionService } from '../transaction/transaction.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService,
    private readonly auditService: AuditService,
  ) {}

  // User Management
  async getUsers(query: any): Promise<any> {
    // Optionally apply filters based on query
    return this.userService.findAll(query);
  }

  async getUserById(id: string): Promise<any> {
    return this.userService.findById(id);
  }

  async updateUserStatus(id: string, status: string): Promise<any> {
    await this.userService.update(id, { status });
    await this.auditService.log(`Admin updated user ${id} status to ${status}`);
    return { message: `User status updated to ${status}` };
  }

  async resetUserPassword(id: string, newPassword: string): Promise<any> {
    // In production, ensure password hashing is applied
    await this.userService.update(id, { password: newPassword });
    await this.auditService.log(`Admin reset password for user ${id}`);
    return { message: 'Password reset successfully' };
  }

  // Transaction Monitoring
  async getTransactions(query: any): Promise<any> {
    return this.transactionService.getAll(query);
  }

  async flagTransaction(id: string, flag: boolean): Promise<any> {
    await this.transactionService.flagTransaction(id, flag);
    await this.auditService.log(`Admin ${flag ? 'flagged' : 'unflagged'} transaction ${id}`);
    return { message: `Transaction ${flag ? 'flagged' : 'unflagged'}` };
  }

  // System Metrics
  async getSystemMetrics(): Promise<any> {
    const totalUsers = await this.userService.countUsers();
    const totalFunds = await this.walletService.getTotalFunds();
    const dailyVolume = await this.transactionService.getDailyVolume();
    return { totalUsers, totalFunds, dailyTransactionVolume: dailyVolume };
  }

  // Adjust Wallet Balance
  async adjustWallet(userId: string, adjustDto: { amount: number; reason: string }): Promise<any> {
    await this.walletService.adjustBalance(userId, adjustDto.amount);
    await this.auditService.log(`Admin adjusted wallet of ${userId} by ${adjustDto.amount}. Reason: ${adjustDto.reason}`);
    return { message: 'Wallet adjusted successfully' };
  }

  // Content Management (Promos/News)
  async createContent(contentDto: { title: string; message: string }): Promise<any> {
    // In a real system, you would persist this content and broadcast it
    await this.auditService.log(`Admin created content: ${contentDto.title}`);
    return { message: 'Content created successfully', content: contentDto };
  }

  // Audit Logs
  async getAuditLogs(query: any): Promise<any> {
    return this.auditService.getLogs(query);
  }
}
