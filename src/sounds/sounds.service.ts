import { Injectable, Inject } from '@nestjs/common';
import { SoundsQueue } from './sounds.queue';
import { ChatUserstate } from 'tmi.js';
import { SoundsGateway } from './sounds.gateway';

@Injectable()
export class SoundsService {
    constructor(
        @Inject('SOUNDS_QUEUE') private _queue: SoundsQueue,
        @Inject() private _socket: SoundsGateway,
    ) {}

    public play(channel: string, chatter: ChatUserstate, sound: any) {
        if (this._queue.isInQueue(chatter.username)) return;

        this._socket.send('play::sound', channel, sound);

    }

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
