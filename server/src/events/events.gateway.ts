import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NameSpaces, SocketEvents, BusEvents } from 'src/contracts/enums';
import { EventBus } from './events.bus';
import { Inject, Logger } from '@nestjs/common';
import * as qs from 'querystring';
import * as crypto from 'crypto';
import integrationConfig from 'src/config/integration.config';
import { ConfigType } from '@nestjs/config';
import { RedisAdapter } from 'socket.io-redis';
import { errMap } from 'src/utils/errors';

@WebSocketGateway({ namespace: NameSpaces.ExampleSpace })
export class EventsGateway implements OnGatewayInit {
  private readonly logger = new Logger(EventsGateway.name);
  constructor(
    @Inject(integrationConfig.KEY)
    private config: ConfigType<typeof integrationConfig>,
  ) {}

  @WebSocketServer()
  server!: Server;

  afterInit(initServer: Server) {
    initServer.use((socket, next) => {
      const query = socket.handshake.query;

      const ordered: { [key: string]: any } = {};
      Object.keys(query)
        .sort()
        .forEach((key) => {
          if (key.slice(0, 3) === 'vk_') {
            ordered[key] = query[key];
          }
        });

      const stringParams = qs.stringify(ordered);
      const paramsHash = crypto
        .createHmac('sha256', this.config.vkSecretKey ?? '')
        .update(stringParams)
        .digest()
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=$/, '');

      const signed = paramsHash === query.sign;
      this.logger.log(`ws result ${signed}`);
      if (!signed) {
        next(new Error('Authentication error'));
      } else {
        next();
      }
    });

    const paymentComplete = (userId: number) => {
      this.logger.log(`emit paymentComplete for user ${userId}`);
      initServer.to(userId.toString()).emit(SocketEvents.payment_complete);
    };

    EventBus.on(BusEvents.PAYMENT_COMPLETE, paymentComplete);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { listGUID, userId }: { listGUID?: string; userId: number },
  ) {
    await this.autoLeaveRooms(socket);

    const adapter = socket.adapter as RedisAdapter;

    if (listGUID) {
      adapter.remoteJoin(socket.id, listGUID, (error: Error) => {
        if (error) {
          this.logger.log(`joined room failed ${listGUID}`);
          this.logger.error(errMap(error));
        } else {
          this.logger.log(`joined room ${listGUID}`);
        }
      });
    }

    adapter.remoteJoin(socket.id, userId.toString(), (error: Error) => {
      if (error) {
        this.logger.log(`joined room failed ${userId}`);
        this.logger.error(errMap(error));
      } else {
        this.logger.log(`joined room ${userId}`);
      }
    });
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { listGUID, userId }: { listGUID?: string; userId: number },
  ) {
    const adapter = socket.adapter as RedisAdapter;
    this.logger.log('list socket leave room');
    if (!!listGUID) {
      adapter.remoteLeave(socket.id, listGUID, (err: Error) => {
        if (err) {
          this.logger.error(errMap(err));
        }
      });
    }

    adapter.remoteLeave(socket.id, userId.toString(), (err: Error) => {
      if (err) {
        this.logger.error(errMap(err));
      }
    });
  }

  autoLeaveRooms(socket: Socket) {
    return new Promise((res) => {
      const adapter = socket.adapter as RedisAdapter;
      adapter.clientRooms(socket.id, (err: Error, rooms: string[]) => {
        if (err) {
          this.logger.error(errMap(err));
        } else if (rooms?.length) {
          rooms.reduce((r) => {
            adapter.remoteLeave(socket.id, r, (err: Error) => {
              if (err) {
                this.logger.error(errMap(err));
              }
            });
            return '';
          });
        }
        return res();
      });
    });
  }
}
