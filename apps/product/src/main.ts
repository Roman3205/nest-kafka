import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module.js';
import { Transport, AsyncMicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(ProductModule, {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: Transport.KAFKA,
      options: {
        client: { brokers: [config.get<string>('KAFKA_BROKER', 'localhost:9094')] },
        consumer: { groupId: 'product-service-group' },
      },
    }),
  });
  await app.listen();
}
await bootstrap();
