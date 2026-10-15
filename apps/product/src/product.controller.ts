import { Controller, Logger } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from 'apps/api-gateway/src/product/dto/create-product.dto.js';
import { UpdateProductDto } from 'apps/api-gateway/src/product/dto/update-product.dto.js';

// api-gateway sends these via kafkaClient.emit(), so they are events (no reply expected)
@Controller()
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @EventPattern('product.created')
  async handleProductCreated(@Payload() product: CreateProductDto) {
    this.logger.log(`product.created: ${JSON.stringify(product)}`);
    await this.productService.createProduct(product);
  }

  @EventPattern('product.updated')
  async handleProductUpdated(@Payload() { id, ...product }: UpdateProductDto & { id: string }) {
    this.logger.log(`product.updated: ${id}`);
    await this.productService.updateProduct(id, product);
  }

  @EventPattern('product.deleted')
  async handleProductDeleted(@Payload() { id }: { id: string }) {
    this.logger.log(`product.deleted: ${id}`);
    await this.productService.deleteProduct(id);
  }
}
