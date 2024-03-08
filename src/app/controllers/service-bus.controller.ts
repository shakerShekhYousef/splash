// src/app.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ServiceBusService } from '../services/service-bus.service';

@Controller()
export class ServiceBusController {
  constructor(private readonly serviceBusSenderService: ServiceBusService) {}

  @Post('send-message')
  async sendMessage(@Body() message: any) {
    await this.serviceBusSenderService.sendMessage(message);
    return { message: 'Message sent successfully' };
  }
}
