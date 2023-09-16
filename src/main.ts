import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

        app.useStaticAssets(path.join(__dirname, '..', 'public'));
        app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
        app.setViewEngine('pug');
  
  await app.listen(3000);
}
bootstrap();
