import { Inject, Injectable } from '@nestjs/common';
import { ChatUserstate, Client as TmiClient } from "tmi.js";
import { Observable, fromEvent, share, map, filter } from 'rxjs';
import { ClientMessageEvent } from './types';
import { ClientMessage } from './interfaces';
import { formatClientMessageEvent } from './utils';

@Injectable()
export class BotService {

    private readonly _PREFIX: string = '!';

    constructor(
        @Inject('TMI_CLIENT') private _client: TmiClient,
    ) {
        this.connect()
            .then(() => this.join('neverm1nd_o'))
            .then(() => this.handleClientMessageEvents())
            .catch(console.error);
    }

    public $messages: Observable<ClientMessage> = fromEvent(this._client, 'message')
                        .pipe(
                            filter((event: ClientMessageEvent) => !this._isSelfEmmitedAndCommand(event)),
                            map((event) => formatClientMessageEvent(event)),
                        );

    private _isSelfEmmitedAndCommand([, ,message , self]: ClientMessageEvent): boolean {
        return self || !message.startsWith(this._PREFIX);
    }
  
    public async connect(): Promise<[string, number]> {
        return this._client.connect();
    }

    public async disconnect(): Promise<[string, number]> {
        return this._client.disconnect();
    }

    public async join(channel: string): Promise<[string]> {
        return this._client.join(channel);
    }

    public async part(channel: string): Promise<[string]> {
        return this._client.part(channel);
    }

    public handleClientMessageEvents() {
        this.$messages.subscribe({
            next: ({ channel, tags, command, args }: ClientMessage) => {
                console.log(channel, tags, command, args);
                this._client.say(channel, 'Hello!');
            },
        })
    }
}
