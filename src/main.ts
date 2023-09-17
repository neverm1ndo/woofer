import path from 'path';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

        app.useStaticAssets(path.join(__dirname, '..', 'public'));
        app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
        app.setViewEngine('pug');

        // app.use(session({
        //   secret: process.env.SECRET_KEY,
        //   resave: true,
        //   saveUninitialized: true
        // }));
  
  await app.listen(3000);
}
bootstrap();
