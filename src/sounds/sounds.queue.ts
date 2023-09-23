import { Injectable } from '@nestjs/common';
import { Queue, QueueOptions } from "src/shared/queue";

export class SoundsQueue extends Queue {
    constructor() {
        super({
            cooldown: 900000,
            global: {
                enabled: true,
            }
        });
    }

    public getTokenByUsername(username: string) {
        return Symbol.for(username);
    }
}