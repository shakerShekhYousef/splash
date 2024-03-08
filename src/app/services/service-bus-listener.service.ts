// src/service-bus-listener/service-bus-listener.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceBusClient } from '@azure/service-bus';
import { Message, MessageDocument } from '../schemas/messages.schema';

@Injectable()
export class ServiceBusListenerService implements OnModuleInit {
  private serviceBusClient: ServiceBusClient;

  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {
    this.serviceBusClient = new ServiceBusClient(process.env.SERVICE_BUS_CONNECTION_STRING);
  }

  async onModuleInit() {
    await this.listenToQueue('normal-queue');
    await this.listenToQueue('urgent-queue');
  }

  async listenToQueue(queueName: string): Promise<void> {
    const receiver = this.serviceBusClient.createReceiver(queueName);
    receiver.subscribe({
      processMessage: async (brokeredMessage) => {
        console.log(`Received message from ${queueName}: `, brokeredMessage.body);
        const message = new this.messageModel({
          content: brokeredMessage.body,
          receivedAt: new Date(),
        });
        await message.save();
      },
      processError: async (args) => {
        console.log(`Error occurred: ${args.error}`);
      },
    });
    console.log(`Listening to ${queueName}...`);
  }
}
