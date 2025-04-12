import { Controller, Get, Put, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  // User Management Endpoints
  @Get('users')
  async getUsers(@Query() query) {
    // Optional query filters (e.g., email, status) can be passed via query parameters.
    return this.adminService.getUsers(query);
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.adminService.getUserById(id);
  }

  @Put('users/:id/suspend')
  async suspendUser(@Param('id') id: string) {
    return this.adminService.updateUserStatus(id, 'suspended');
  }

  @Put('users/:id/activate')
  async activateUser(@Param('id') id: string) {
    return this.adminService.updateUserStatus(id, 'active');
  }

  @Put('users/:id/reset-password')
  async resetPassword(@Param('id') id: string, @Body('newPassword') newPassword: string) {
    return this.adminService.resetUserPassword(id, newPassword);
  }

  // Transaction Monitoring Endpoints
  @Get('transactions')
  async getTransactions(@Query() query) {
    return this.adminService.getTransactions(query);
  }

  @Put('transactions/:id/flag')
  async flagTransaction(@Param('id') id: string) {
    return this.adminService.flagTransaction(id, true);
  }

  @Put('transactions/:id/unflag')
  async unflagTransaction(@Param('id') id: string) {
    return this.adminService.flagTransaction(id, false);
  }

  // System Metrics Overview
  @Get('dashboard/metrics')
  async getMetrics() {
    return this.adminService.getSystemMetrics();
  }

  // Adjust Wallet Balances
  @Put('wallet/:userId/adjust')
  async adjustWallet(@Param('userId') userId: string, @Body() adjustDto: { amount: number, reason: string }) {
    return this.adminService.adjustWallet(userId, adjustDto);
  }

  // Content Management (Promos/News)
  @Post('content')
  async createContent(@Body() contentDto: { title: string, message: string }) {
    return this.adminService.createContent(contentDto);
  }

  // Audit Logs
  @Get('audit-logs')
  async getAuditLogs(@Query() query) {
    return this.adminService.getAuditLogs(query);
  }
}
