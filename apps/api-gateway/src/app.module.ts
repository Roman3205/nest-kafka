import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductService } from './product/product.service.js';
import { ProductController } from './product/product.controller.js';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api-gateway/.env'
    }),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_PRODUCT_CLIENT',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [config.get('KAFKA_BROKER') ?? 'localhost:9094']
            },
            consumer: {
              groupId: 'product-consumer-group'
            }
          }
        })
      }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
