import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot/bot.service';
import { Client, Options as ClientOptions } from 'tmi.js';
import { ServeStaticModule } from '@nestjs/serve-static';

const clientOptions: ClientOptions = {
  options: {
    debug: true,
    messagesLogLevel: "info",
    clientId: process.env.CLIENT_ID,
    skipUpdatingEmotesets: true
  },
  connection: { 
    reconnect: true, 
    secure: true 
  },
  identity: {
    username: process.env.CLIENT_USERNAME,
    password: process.env.CLIENT_PASSWORD
  },
  channels: []
};

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
      return new Client(clientOptions);
    }}
  ],
})
export class AppModule {}
