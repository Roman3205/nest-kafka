import { Module } from '@nestjs/common';
import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';
import { DatabaseModule } from './database/database.controller.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/product/.env',
      expandVariables: true
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
