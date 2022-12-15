import { Notification } from "src/application/entities/notification";
import { NotificationRepository } from "src/application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";


export class PrismaNotificatinRepository implements NotificationRepository {

    constructor(private prismaService: PrismaService) {

    }

    async create(notification: Notification): Promise<void> {
        await this.prismaService.notification.create({
            data: {
                id: notification.id,
                content: notification.content.value,
                category: notification.category,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                created: notification.createdAt
            }
        });
    }

}