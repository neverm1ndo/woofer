import { Module } from '@nestjs/common';
import { SoundsService } from './sounds.service';
import { SoundsQueue } from './sounds.queue';
 
@Module({
  providers: [
    SoundsService,
    { provide: 'SOUNDS_QUEUE', useClass: SoundsQueue }
  ]
})
export class SoundsModule {}
