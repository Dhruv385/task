import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }
    private opts = {};

    @Post('send')
    async sendOtp(@Body('phoneNumber') phoneNumber: string) {
        const otp = this.otpService.generateOtp();
        await this.otpService.sendOtp(phoneNumber, otp);
        const otpKey = phoneNumber.replace(/\d/g, '');
        this.opts[otpKey] = otp.slice(1);
        return { msg: 'otp send successfully' };
    }

    @Post('verify')
    otpVerify(@Body('phoneNumber') phoneNumber: string, @Body('otp') otp: string) {
        const otpKey = phoneNumber.replace(/\d/g, '');
        const otpstore = this.opts[otpKey];
        if (otpstore && otpstore === otp) {
            return { msg: 'otp verify successfully' };
        }
        return { msg: 'invalid otp' };
    }
}
