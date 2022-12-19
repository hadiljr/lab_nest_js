import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {

    constructor(broker: string, username: string, password: string) {

        super({
            client: {
                clientId: 'notificaitons',
                brokers: [broker],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username,//: 'dmlhYmxlLWtpdGUtODcwMyQR_2RCMaRHhrUT2CerZxZAYGVpiIKnIL6g-aPTdps',
                    password//: 'Z5TN4A7JLX4kd7twWnXWdjGwjcaJgRCZeIbgTTQEphxN_wg-LC0UiYgCAN6FUt0vEmHwmg==',
                },
                ssl: true,
            }
        })
    }

    async onModuleDestroy() {
        await this.close();
    }
}