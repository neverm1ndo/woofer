import { 
    OnGatewayConnection, 
    OnGatewayDisconnect, 
    OnGatewayInit, 
    WebSocketServer, 
    WebSocketGateway,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SoundsService } from "./sounds.service";
import { Sound } from "./interfaces";
@WebSocketGateway({
    cors: {
      origin: '*',
    },
})
export class SoundsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() private _server: Server;

    constructor(private _sounds: SoundsService) {}

    private _send(event: string, channel: string, payload: Sound) {
        this._server.to(channel).emit(event, payload);
    }

    afterInit(_server: Server) {
        console.log('socket.io server init');
        this._sounds.soundEmitter.subscribe({
            next: ([channel, sound]: [string, Sound]) => {
                this._send('sound::play', channel, sound);
            },
            error: console.error,
        })
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`C:${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`DC:${client.id}`);
    }
    
}