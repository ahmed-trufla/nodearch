import { ComponentType, Hook, HookContext, IHook, Logger } from '@nodearch/core';
import { SocketIOConfig } from './socketio.config';
import io from 'socket.io';
import { MetadataManager } from '../metadata';
import { SocketIOService } from './socketio.service';
import { INamespace } from '../interfaces';


@Hook()
export class SocketIOHook implements IHook {

  private socketIOService: SocketIOService;
  private ioServer: io.Server;
  private logger: Logger;


  constructor(socketIOService: SocketIOService, socketIOConfig: SocketIOConfig, logger: Logger) {
    this.socketIOService = socketIOService;
    this.ioServer = socketIOConfig.ioServer;
    this.logger = logger;
  }

  async onInit(context: HookContext) {
    const controllers = context.getComponents(ComponentType.Controller);
    if (!controllers) return;

    const controllersMetadata = this.socketIOService.getControllersMetadata(controllers);
    const namespacesMetadata = this.socketIOService.getNamespacesMetadata(controllersMetadata);
    
    namespacesMetadata.forEach(ns => {
      const nsControllers = MetadataManager.getNamespaceControllers(ns.classRef);

      this
        .ioServer
        .of(ns.name)
        .use((socket, next) => { 
          // get the namespace instance with every new connection and pass it via data
          const nsInstance: INamespace = context.getContainer().get(ns.classRef);
          
          socket.data.nodearch = {
            nsInstance
          };

          nsInstance.middleware?.(socket)
            .then(() => next())
            .catch((err) => next(err));
        })
        .on('connection', (socket) => {
          const nsInstance: INamespace = socket.data.nodearch.nsInstance;

          this.socketIOService.registerEvents(
            ns.events, 
            nsControllers,
            socket,
            nsInstance
          );

          nsInstance.onConnection?.(socket);
          
          this.logger.debug(`New socket connected: ${socket.id}`);

          // TODO: add catch all events https://socket.io/docs/v4/listening-to-events/#catch-all-listeners
          // TODO: add all remaining events, like on error, on connect_error, etc.

          socket.on('disconnect', () => {
            nsInstance.onDisconnect?.(socket);

            this.logger.debug(`Socket disconnected: ${socket.id}`);
          });
        });

    });
  }

  async onStart() {}
}