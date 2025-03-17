import { Module } from '@nestjs/common';
import { ServiceOne } from './one.service';
import { ServiceThree } from './three.service';
import { ServiceTwo } from './two.service';

@Module({
  providers: [ServiceOne, ServiceTwo, ServiceThree],
  exports: [ServiceOne],
})
export class LazyModule {
  static unique() {
    return {
      module: LazyModule
    };
  }
}
