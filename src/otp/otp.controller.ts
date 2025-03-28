import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService){}
    private opts = {};
    
    @Post('send')
    async sendOtp(@Body('phoneNumber') phoneNumber: string){
        const otp = this.otpService.generateOtp();
        await this.otpService.sendOtp(phoneNumber, otp);
        this.opts[phoneNumber] = otp;
        return {msg: 'otp send successfully'};
    }

    @Post('verify')
    otpVerify(@Body('phoneNumber') phoneNumber: string, @Body('otp') otp: string){
        const otpstore = this.opts[phoneNumber];
        if(otpstore && otpstore===otp){
            return {msg: 'otp verify successfully'};
        }
        return {msg: 'invalid otp'};
    }
}
