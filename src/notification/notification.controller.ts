import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post('send')
    async sendNotification(@Body('token') token: string) {
        try {
            await this.notificationService.sendNotification(token);
            return { msg: 'Notification sent successfully' };
        } catch (err) {
            console.error(err);
            return { msg: err instanceof Error ? err.message : 'Failed to send notification' };
        }
    }
}
