import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class OtpService {
    private twilioClient: twilio.Twilio;
    private readonly twilioPhoneNumber: string;
    constructor() {
        const accountSid = process.env.acc_sid;
        const authToken = process.env.auth_token;
        this.twilioPhoneNumber = process.env.phone_number as string;

        this.twilioClient = twilio(accountSid, authToken);
    }

    async sendOtp(phoneNumber: string, otp: string): Promise<void> {
        await this.twilioClient.messages.create({
            body: `Your OTP for login verification is: ${otp}  
                    Please enter this OTP to complete your authentication.  
                    This OTP is valid for 5 minutes.  

                    Best,  
                    [Dhruv]`,
            from: this.twilioPhoneNumber,
            to: phoneNumber,
        });
    }

    generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString(); 
    }
}
