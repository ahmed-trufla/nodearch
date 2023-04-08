import { AppContext, Hook, IHook } from '@nodearch/core';
import { JoiDecorator } from '../enums.js';

@Hook({ export: true })
export class JoiHook implements IHook {
  constructor(
    private readonly appContext: AppContext
  ) {}

  async onStart() {
    // console.log('JoiHook');

    const deco = this.appContext.components.getDecorators({id: JoiDecorator.VALIDATE})[0];

    deco.data!.fn = () => {
      console.log('Validate from hook works!!!!!!!!!!!!');
      throw new Error('Validate from hook works!!!!!!!!!!!!');
    };

  }
}