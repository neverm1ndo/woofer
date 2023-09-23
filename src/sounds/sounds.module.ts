import { Module } from '@nestjs/common';
import { SoundsService } from './sounds.service';
import { SoundsQueue } from './sounds.queue';
import { SoundsGateway } from './sounds.gateway';
 
@Module({
  providers: [
    { provide: 'SOUNDS_QUEUE', useClass: SoundsQueue },
    SoundsGateway,
    SoundsService,
  ]
})
export class SoundsModule {}
