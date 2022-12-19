import { SendNotification } from "@application/use-cases/send-notification";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { NotificationsController } from "./kafka/controllers/notifications.controller";
import { KafkaConsumerService } from "./kafka/kafka-consumer.service";
import { ConfigService } from '@nestjs/config';

const kafkaConsumerServiceProvider = {
    provide: KafkaConsumerService,
    useFactory: (config: ConfigService) => {
        const broker = config.get<string>('KAFKA_BROKER') ?? "";
        const username = config.get<string>('KAFKA_USER') ?? "";
        const password = config.get<string>('KAFKA_PASS') ?? "";
        return new KafkaConsumerService(broker, username, password)
    },
    inject: [ConfigService]
}


@Module({
    imports: [DatabaseModule],
    providers: [kafkaConsumerServiceProvider, SendNotification],
    controllers: [NotificationsController]
})
export class MessagingModule { }