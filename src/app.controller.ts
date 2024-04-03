import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  EventPattern,
  RpcException,
} from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'sum' })
  getSum(numbers: number[]): number {
    const sum = numbers.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );

    if (sum > 10) return sum;
    throw new RpcException('This is a custom error message');
  }

  @EventPattern('user_created')
  createUser(nums: number[]): Array<number> {
    const multipliedNumbers = nums.map((number) => number * 73);
    return multipliedNumbers;
  }
}
