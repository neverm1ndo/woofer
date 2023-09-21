import { Injectable, Inject } from '@nestjs/common';
import { SoundsQueue } from './sounds.queue';
import { ChatUserstate } from 'tmi.js';

@Injectable()
export class SoundsService {
    constructor(
        @Inject('SOUNDS_QUEUE') private _queue: SoundsQueue,
    ) {}

    public addToQueue({ username }: ChatUserstate) {
        this._queue.toTimeout(username);
    }

    public removeFromQueue({ username }: ChatUserstate) {
        this._queue.removeFromQueue(username);
    }

    public getRemainTimer({ username }: ChatUserstate): Promise<string> {
        const token = this._queue.getTokenByUsername(username);
        return this._queue.countRemainTime(token);
    }
}
