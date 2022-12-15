import { Module } from "@nestjs/common";
import { NotificationRepository } from "src/application/repositories/notification-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificatinRepository } from "./prisma/repositories/prisma-notifications-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: NotificationRepository,
            useClass: PrismaNotificatinRepository
        }
    ],
    exports: [
        NotificationRepository,
    ]
})
export class DatabaseModule { }