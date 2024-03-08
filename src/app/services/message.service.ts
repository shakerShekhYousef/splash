import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBusClient, ServiceBusReceiver } from '@azure/service-bus';
import { IMessage } from '../interfaces/message.interface';

@Injectable()
export class MessageService implements OnModuleInit {
  private readonly logger = new Logger(MessageService.name);
  private receiver: ServiceBusReceiver;
  private serviceBusClient: ServiceBusClient;

  constructor(@InjectModel('Message') private readonly messageModel: Model<IMessage>) {
    this.serviceBusClient = new ServiceBusClient(process.env.SERVICE_BUS_CONNECTION_STRING);
    this.receiver = this.serviceBusClient.createReceiver(process.env.QUEUE_NAME);
  }

  async onModuleInit() {
    try {
      // Set up a subscription to receive messages.
      const subscription = this.receiver.subscribe({
        processMessage: async (brokeredMessage) => {
          this.logger.log(`Received message: ${brokeredMessage.body}`);
          await this.saveMessage(brokeredMessage.body);
        },
        processError: async (args) => {
          this.logger.error(`Error processing message: ${args.error}`);
        },
      });

      this.logger.log(`Listening for messages on queue: ${process.env.QUEUE_NAME}`);
    } catch (error) {
      this.logger.error(`Error creating receiver: ${error.message}`);
    }
  }

  private async saveMessage(content: any) {
    const newMessage = new this.messageModel({ content });
    await newMessage.save();
    this.logger.log(`Message saved to database: ${content}`);
  }
}
