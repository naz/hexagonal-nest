import { Inject as NestInject } from '@nestjs/common';

export function Inject(token: string) {
  return function (a, b, c) {
    return NestInject(`${a.name}.${token}`)(a, b, c);
  };
}
