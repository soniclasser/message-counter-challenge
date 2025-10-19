import { Server } from 'socket.io';
import { injectable, inject } from 'tsyringe';

@injectable()
export class SocketService {
  constructor(private io: Server) {}

  emitMockEvent(payload: any) {
    console.log('[SocketService] Emitting mockEvent:', payload);
    this.io.emit('mockEvent', payload);
  }
}
