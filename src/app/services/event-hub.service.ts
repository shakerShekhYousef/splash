import { Injectable, Logger } from '@nestjs/common';
import { EventHubConsumerClient } from '@azure/event-hubs';
import { ServiceBusService } from './service-bus.service';

@Injectable()
export class EventHubService {
  private readonly logger = new Logger(EventHubService.name);

  constructor(private serviceBusService: ServiceBusService) {}

  async startConsuming() {
    const consumerClient = new EventHubConsumerClient(process.env.EVENT_HUB_CONSUMER_GROUP, process.env.EVENT_HUB_CONNECTION_STRING);

    consumerClient.subscribe({
      processEvents: async (events, context) => {
        for (const event of events) {
          this.logger.debug(`Received event: ${JSON.stringify(event.body)}`);
          // Based on the event data, determine which queue to send to
          const queueName = this.determineQueue(event.body);
          await this.serviceBusService.sendMessage(event.body);
        }
      },
      processError: async (error, context) => {
        this.logger.error(`Error on event hub consumer: ${error.message}`);
      },
    });
  }

  private determineQueue(eventBody: any): string {
    return 'splash';
  }
}
