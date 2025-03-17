import { Module } from '@nestjs/common';
import { ServiceOne } from './one.service';
import { ServiceTwo } from './two.service';

@Module({
  providers: [ServiceOne, ServiceTwo],
  exports: [ServiceOne],
})
export class LazyModule {
  static unique() {
    return {
      module: LazyModule,
      providers: [
        {
          provide: 'noop',
          useValue: Math.random(), // ensure that always a new instance will be created
        },
      ],
    };
  }
}
