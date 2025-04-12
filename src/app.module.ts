// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the AuthModule so that your auth endpoints are registered.
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, // Makes the ConfigModule available throughout your app
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL, // Stored in .env file
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // Optionally: extra: { useUnifiedTopology: true },
    }),
    AuthModule,   // Make sure this is imported so /auth routes are registered
    OtpModule,
    // ... import any other modules as needed
  ],
})
export class AppModule {}
