import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot/bot.service';
import { Client } from 'tmi.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SoundsModule } from './sounds/sounds.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/woofer'),
    SoundsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    BotService,
    { provide: 'TMI_CLIENT', useFactory: () => {
      return new Client({
        options: {
          debug: true,
          messagesLogLevel: "info",
          skipUpdatingEmotesets: true
        },
        connection: { 
          reconnect: true, 
          secure: true 
        },
        identity: {
          username: process.env.CLIENT_USERNAME,
          password: process.env.CLIENT_OAUTH
        },
        channels: []
      });
    }}
  ],
})
export class AppModule {}
