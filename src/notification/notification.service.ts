import { Body, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
    constructor(){
        const serviceAccount = require("/home/admin2510/Desktop/NewFolder/task/src/notification/fake_missing_key.json");
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    async sendNotificaton(token: string): Promise<void> {
        const message: admin.messaging.Message= {
            notification: {
                title: 'Welcome to Dhurv',
                body: 'Thank you for signing up! Stay tuned for updates and alerts.',
            },
            data: {
                additionalData: 'value'
            },
            token: token
        };
        await admin.messaging().send(message).then((res)=>{
            console.log("Notification sent: ",res);
        }).catch((err)=>{
            console.error(err);
        })
    }
}
