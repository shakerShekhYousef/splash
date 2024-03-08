// src/service-bus-sender/service-bus-sender.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ServiceBusClient, ServiceBusMessage } from '@azure/service-bus';

@Injectable()
export class ServiceBusService {
  private serviceBusClient: ServiceBusClient;
  private readonly logger = new Logger(ServiceBusService.name);

  constructor() {
    this.serviceBusClient = new ServiceBusClient(process.env.SERVICE_BUS_CONNECTION_STRING);
  }

  determineQueue(message: any): string {
    if (message.type === 'urgent') {
      return 'urgent-queue';
    } else {
      return 'normal-queue';
    }
  }

  async sendMessage(message: any): Promise<void> {
    const queueName = this.determineQueue(message);
    const sender = this.serviceBusClient.createSender(queueName);
    const serviceBusMessage: ServiceBusMessage = {
      body: message,
    };

    try {
      this.logger.log(`Sending message to queue: ${queueName}`, JSON.stringify(message));
      await sender.sendMessages(serviceBusMessage);
      this.logger.log(`Message sent successfully to ${queueName}`);
    } catch (err) {
      this.logger.error(`Error sending message to Service Bus ${queueName}: ${err.toString()}`, err.stack);
      throw err; // Rethrow the error for external handling if necessary
    } finally {
      await sender.close();
    }
  }
}
