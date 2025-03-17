import { Controller, Get } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Controller()
export class AppController {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  private lastModuleRef: any = undefined;

  @Get('not-work')
  async notWork() {
    const { LazyModule } = await import('./lazy/module');
    const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);
    // const moduleRef = await this.lazyLoadModule.load(() => LazyModule.unique()); // works

    if (!this.lastModuleRef) this.lastModuleRef = moduleRef;
    else console.log(this.lastModuleRef === moduleRef);

    const { ServiceOne } = await import('./lazy/one.service');
    const _service = await moduleRef.resolve(ServiceOne);
    console.log('resolved');

    return _service.getHello('not work');
  }
}
