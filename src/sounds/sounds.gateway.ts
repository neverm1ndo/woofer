import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

export class SoundsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    send(event: string, channel: string, payload: any): void {
        try {
            payload = JSON.stringify(payload);
            this.server.in(channel)
                       .emit(event, payload);
        } catch(err) {
            console.error(err);
        } 
    }

    afterInit(server: Server) {
        console.log('socket.io server init');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`C:${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`DC:${client.id}`);
    }
    
}