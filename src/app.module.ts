import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { QrCodeModule } from './qr-code/qr-code.module';
import { OtpModule } from './otp/otp.module';
import { AdminModule } from './admin/admin.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL, // set in .env file
      synchronize: true, // careful in production
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // If needed, you can move additional options in extra:
      // extra: { useUnifiedTopology: true },
    }),
    AuthModule,
    UserModule,
    WalletModule,
    TransactionModule,
    QrCodeModule,
    OtpModule,
    AdminModule,
    AuditModule,
  ],
})
export class AppModule {}
