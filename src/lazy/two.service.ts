import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceTwo {
  getHello(where: string): string {
    return 'Hello World ' + where;
  }
}
