import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FE_URL,
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('onConnect')
  async onConnect(@ConnectedSocket() client: Socket, @MessageBody() userId: number) {
    try {
      client.join(userId.toString());
      return `User ${userId.toString()} connected`;
    } catch (error) {
      return `${error.message}`;
    }
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    try {
      const participants = [+data.friendId, +data.userId];
      const roomId = await this.messagesService.joinRoom(participants);
      client.join(roomId);
      const messages = await this.messagesService.findAll(roomId);
      return { messages, roomId };
    } catch (error) {
      return error.message;
    }
  }

  @SubscribeMessage('sendMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    try {
      const newMessage = await this.messagesService.create(createMessageDto);
      this.server.to(createMessageDto.chatboxId.toString()).emit('receiveMessage', newMessage);
    } catch (error) {
      return { error: error.message };
    }
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    try {
      client.leave(roomId);
    } catch (error) {
      return error.message;
    }
  }
}
