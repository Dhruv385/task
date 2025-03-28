import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path'

@Injectable()
export class EmailService {
    private transporter: nodemailer.transporter;

    constructor(){}
    async sendEmail(to: string, subject: string, html: string): Promise<void>{
        const filePath = path.join(__dirname, '../Holiday_calendar_2025.pdf');
        console.log(filePath); 

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.email_uri,
                pass: process.env.pass_uri
            },
        });

        const mailOptions = {
            from: process.env.email_uri,
            to,
            subject,
            html,
            attachments: [{
              filename: "Holiday calendar 2025.pdf",
              path: filePath,
            }]
        };  
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };
}
