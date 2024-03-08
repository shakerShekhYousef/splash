// src/data-processor/data-processor.service.ts
import { Injectable } from '@nestjs/common';
import { EventHubService } from './event-hub.service';
import { ServiceBusService } from './service-bus.service';

@Injectable()
export class DataProcessorService {
  constructor(
    private readonly eventHubService: EventHubService,
    private readonly serviceBusService: ServiceBusService,
  ) {}

  async startProcessing() {
    const processEvent = async (events, context) => {
      for (const event of events) {
        console.log(`Received event: ${JSON.stringify(event.body)}`);
        const queueName = this.determineQueue(event.body);
        await this.serviceBusService.sendMessage(event.body);
      }
    };

    const processError = async (error) => {
      console.error("Error on receiving event: ", error);
    };

    await this.eventHubService.startConsuming();
  }

  private determineQueue(eventBody: any): string {
    return 'splash'; 
  }
}
