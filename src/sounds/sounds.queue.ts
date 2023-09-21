import { Inject } from '@nestjs/common';
import { Queue, QueueOptions } from "src/shared/queue";

export class SoundsQueue extends Queue {
    constructor(@Inject() options: QueueOptions) {
        super(options);
    }

    public getTokenByUsername(username: string) {
        return Symbol.for(username);
    }
}