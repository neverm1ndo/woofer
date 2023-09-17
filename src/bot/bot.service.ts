import { Inject, Injectable } from '@nestjs/common';
import { Client } from "tmi.js";

@Injectable()
export class BotService {
    constructor(
        @Inject('TMI_CLIENT') private _client: Client,
    ){
        
    }
}
