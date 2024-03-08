import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { ServiceBusController } from '../app/controllers/service-bus.controller';
import { ServiceBusService } from '../app/services/service-bus.service';
import { ServiceBusListenerService } from '../app/services/service-bus-listener.service';
import { MessageService } from '../app/services/message.service';
import { EventHubService } from '../app/services/event-hub.service';
import { DataProcessorService } from '../app/services/data-process.service';



const MODULES = [
  DatabaseModule,
];

const CONTROLLERS = [
  ServiceBusController,
];

const PROVIDERS = [
  ServiceBusService,
  ServiceBusListenerService,
  MessageService,
  EventHubService,
  DataProcessorService
];

@Module({
  imports: [...MODULES],
  controllers: [...CONTROLLERS],
  providers: [...PROVIDERS],
})
export class AppModule {}