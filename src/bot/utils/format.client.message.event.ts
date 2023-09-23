import { ClientMessage } from "src/bot/interfaces";
import { ClientMessageEvent } from "src/bot/types/client.message";

export function formatClientMessageEvent([ channel, tags, message ]: ClientMessageEvent): ClientMessage {
    const args = message.slice(1).split(' ');
    const command = args.shift()!.toLowerCase();
    channel = channel.substring(1, channel.length);

    return {
        channel,
        tags,
        command,
        args,
    };
}