import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { OtpService } from './otp/otp.service';
import { OtpController } from './otp/otp.controller';
import { OtpModule } from './otp/otp.module';
import { NotificationModule } from './notification/notification.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [EmailModule, OtpModule, NotificationModule],
  controllers: [AppController, OtpController],
  providers: [AppService, OtpService],
})
export class AppModule {}
