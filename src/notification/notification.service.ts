import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
    constructor() {
        if (!admin.apps.length) {
            const serviceAccount = require(path.resolve(__dirname, 'firebaese_key.json'));
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
    }

    async sendNotification(token: string): Promise<void> {
        if (!token || !token.trim()) {
            throw new Error('FCM token is required');
        }

        const message: admin.messaging.Message = {
            notification: {
                title: 'Welcome to Dhurv',
                body: 'Thank you for signing up! Stay tuned for updates and alerts.',
            },
            data: {
                additionalData: 'value',
            },
            token,
        };

        const response = await admin.messaging().send(message);
        console.log('Notification sent: ', response);
    }

    async sendNotificaton(token: string): Promise<void> {
        return this.sendNotification(token);
    }
}
