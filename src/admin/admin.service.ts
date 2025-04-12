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

  // User Management Methods
  async getUsers(query: any) {
    // For demonstration, returning all users.
    return this.userService.findAll(query);
  }

  async getUserById(id: string) {
    return this.userService.findById(id);
  }

  async updateUserStatus(id: string, status: string) {
    await this.userService.update(id, { status });
    await this.auditService.log(`Admin updated user ${id} status to ${status}`);
    return { message: `User status updated to ${status}` };
  }

  async resetUserPassword(id: string, newPassword: string) {
    // In production: Remember to hash the new password.
    await this.userService.update(id, { password: newPassword });
    await this.auditService.log(`Admin reset password for user ${id}`);
    return { message: 'Password reset successfully' };
  }

  // Transaction Monitoring Methods
  async getTransactions(query: any) {
    return this.transactionService.getAll(query);
  }

  async flagTransaction(id: string, flag: boolean) {
    await this.transactionService.flagTransaction(id, flag);
    await this.auditService.log(`Admin ${flag ? 'flagged' : 'unflagged'} transaction ${id}`);
    return { message: `Transaction ${flag ? 'flagged' : 'unflagged'}` };
  }

  // System Metrics Overview
  async getSystemMetrics() {
    const totalUsers = await this.userService.countUsers();
    const totalFunds = await this.walletService.getTotalFunds();
    const dailyTransactionVolume = await this.transactionService.getDailyVolume();
    return { totalUsers, totalFunds, dailyTransactionVolume };
  }

  // Adjust Wallet Balances
  async adjustWallet(userId: string, adjustDto: { amount: number, reason: string }) {
    await this.walletService.adjustBalance(userId, adjustDto.amount);
    await this.auditService.log(`Admin adjusted wallet of ${userId} by ${adjustDto.amount}. Reason: ${adjustDto.reason}`);
    return { message: 'Wallet adjusted successfully' };
  }

  // Content Management (Promos/News)
  async createContent(contentDto: { title: string, message: string }) {
    // In a real application, you might save this to a "content" collection and broadcast it.
    await this.auditService.log(`Admin created content with title: ${contentDto.title}`);
    return { message: 'Content created successfully', content: contentDto };
  }

  // Audit Logs
  async getAuditLogs(query: any) {
    return this.auditService.getLogs(query);
  }
}
