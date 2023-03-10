import { MessagingModule } from '@infra/messaging/messaging.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';


@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule, ConfigModule.forRoot({
    isGlobal: true
  })],
})
export class AppModule { }
