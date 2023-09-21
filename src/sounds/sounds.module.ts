import { Module } from '@nestjs/common';
import { SoundsService } from './sounds.service';

@Module({
  providers: [SoundsService]
})
export class SoundsModule {}
