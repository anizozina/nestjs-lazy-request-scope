import { Injectable } from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces';
import { ServiceTwo } from './two.service';

@Injectable({ scope: Scope.REQUEST })
export class ServiceOne {
  constructor(private serviceTwo: ServiceTwo) {
    console.log('initialized', serviceTwo);
  }

  getHello(where: string): string {
    console.log('this.serviceTwo:', this.serviceTwo);
    return this.serviceTwo.getHello(where);
  }
}
