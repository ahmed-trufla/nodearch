import io, { Socket } from 'socket.io';
import { ClassConstructor } from '../../../system/core/dist';
import { HandlerParamType } from './enums';

export interface ISocketIOOptions {
  ioServer: io.Server;
}

export interface IControllerMetadata {
  eventsMetadata: IEventSubscribeMetadata[];
  controller: ClassConstructor;
}

export interface IHandlerParamsMetadata {
  type: HandlerParamType;
  index: number;
}

export interface IEventSubscribeMetadata {
  eventName: string;
  method: string;
  params: IHandlerParamsMetadata[];
}

export interface IEventSubscribe extends IEventSubscribeMetadata {
  controller: ClassConstructor;
}

/**
 * A reference to the Namespace and how it's being used on a given controller/method
 * These metadata are stored on the Controller class
 */
export interface IControllerNamespaceMetadata {
  name: string;
  classRef: ClassConstructor;
  method?: string;
};

export interface INamespaceInfo {
  classRef: ClassConstructor;
  name: string;
  events: IEventSubscribe[];
}

export interface ISocketIOController {
  controller: ClassConstructor;
  events: IEventSubscribe[];
  // namespaces: INamespaceMetadata[];
}

export type ParentNspNameMatchFn = (name: string, auth: {
  [key: string]: any;
}, fn: (err: Error | null, success: boolean) => void) => void;

export interface INamespaceEvents extends IEventSubscribe {
  controller: ClassConstructor;
}

export interface INamespaceControllerMetadata {
  classRef: ClassConstructor;
  instanceKey: string;
}

export interface INamespace {
  middleware?(socket: Socket): Promise<void>;
  onConnection?(socket: Socket): void;
  onDisconnect?(socket: Socket): void;
  [key: string]: any;
}