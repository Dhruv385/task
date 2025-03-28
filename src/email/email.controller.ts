import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Get()
    async sendTestEmail() {
        const to = 'dhruvag576@gmail.com';
        const subject = 'Test Email is test email from Nodemailer';
        const html= `<h3>Subject: Welcome to the Email Notification System</h3>

            Hi, Dhruv,

            Welcome to our Notification System!

            This is a test email to verify that your Nodemailer setup is working correctly.
            Please find the attached **Holiday Calendar** for reference.

            Best Regards,
            [Dhruv Agarwal]
          `;
        await this.emailService.sendEmail(to, subject, html);
        return { message: 'Email sent successfully' };
    }
}
