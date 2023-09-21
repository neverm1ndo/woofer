import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot/bot.service';
import { Client, Options as ClientOptions } from 'tmi.js';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
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
