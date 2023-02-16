
// TODO: should we move this to backend packages instead?

import { CoreAnnotation } from '../../registry/enums.js';
import { IComponentOptions } from '../../registry/interfaces.js';
import { ComponentFactory } from '../../registry/factory.js';

export const Controller = (options?: IComponentOptions): ClassDecorator => 
  ComponentFactory.componentDecorator({ id: CoreAnnotation.Controller, options});