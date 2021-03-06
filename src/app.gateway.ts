import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server,Socket} from 'socket.io'
@WebSocketGateway({
  origin:'*',
  cors:true
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 @WebSocketServer() server:Server;
 private logger:Logger=new Logger('AppGateway')

 @SubscribeMessage('msgToServer')
 handleMessage(client:Socket,payload:string){
   this.server.emit('msgToClient',payload)
 }

 afterInit(server:Server) {
   this.logger.log('Init')
 }

 handleDisconnect(client:Socket) {
   this.logger.log(`Client disconnected ${client.id}`)
 }

 handleConnection(client:Socket, ...args: any[]) {
  this.logger.log(`Client connected ${client.id}`)
 }

}
