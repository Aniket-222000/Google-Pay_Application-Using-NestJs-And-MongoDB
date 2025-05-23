// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');  // All endpoints will be prefixed with /api
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000/api');
}
bootstrap();
