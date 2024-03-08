import { Test, TestingModule } from '@nestjs/testing';
import { ServiceBusService } from '../src/app/services/service-bus.service';
import { ServiceBusClient } from '@azure/service-bus';

describe('ServiceBusService', () => {
  let service: ServiceBusService;
  let mockServiceBusClient: Partial<ServiceBusClient>;

  beforeEach(async () => {
    mockServiceBusClient = {
      // Mock methods of ServiceBusClient as necessary
      createSender: jest.fn().mockImplementation(() => ({
        sendMessages: jest.fn().mockResolvedValue(undefined),
        close: jest.fn().mockResolvedValue(undefined),
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceBusService,
        {
          provide: ServiceBusClient,
          useValue: mockServiceBusClient,
        },
      ],
    }).compile();

    service = module.get<ServiceBusService>(ServiceBusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a message to the urgent queue', async () => {
    const testMessage = { type: 'urgent', content: 'Test Message' };
    await service.sendMessage(testMessage);
    expect(mockServiceBusClient.createSender).toHaveBeenCalledWith('urgent-queue');
    // Further assertions can be made based on how `sendMessage` is implemented
  });
});
