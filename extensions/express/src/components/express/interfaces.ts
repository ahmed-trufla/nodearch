import { HttpMethod, RouteHandlerParam } from './enums';
import { IMiddlewareInfo } from '../middleware/interfaces';
import { IOpenAPIInfo, OpenAPIOptions } from '../openapi/interfaces';
import { IUploadInfo } from '../file-upload/interfaces';
import { IValidationSchema } from '../validation/interfaces';
import { ComponentInfo } from '@nodearch/core';
import { IHttpErrorsOptions } from '../errors/interfaces';
import Joi from 'joi';
import multer from 'multer';
import http from 'http';
import https from 'https';


export interface IExpressAppOptions {
  hostname?: string;
  port?: number;

  http?: http.ServerOptions;
  https?: https.ServerOptions;

  httpErrors?: IHttpErrorsOptions;
  validation?: Joi.ValidationOptions;
  openAPI?: OpenAPIOptions;
  fileUpload?: multer.Options;
}

export interface IExpressInfo {
  routers: IExpressRouter[];
}

export interface IExpressRouter {
  controllerInfo: ComponentInfo;
  path: string;
  openApi?: IOpenAPIInfo;
  routes: IExpressRoute[];
  middleware: IMiddlewareInfo[];
}

export interface IExpressRoute {
  controllerMethod: string;
  path: string;
  method: HttpMethod;
  middleware: IMiddlewareInfo[];
  inputs: IExpressRouteHandlerInput[];
  openApi?: IOpenAPIInfo;
  validation?: IValidationSchema;
  fileUpload?: IUploadInfo;
}

export interface IExpressRouteHandlerInput {
  index: number;
  type: RouteHandlerParam;
  key?: string;
}