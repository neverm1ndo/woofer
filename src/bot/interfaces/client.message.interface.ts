import { ChatUserstate } from "tmi.js";

export interface ClientMessage {
    channel: string;
    tags: ChatUserstate;
    command: string;
    args: string[];
}