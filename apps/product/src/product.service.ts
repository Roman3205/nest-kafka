import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from 'apps/api-gateway/src/product/dto/create-product.dto.js';
import { UpdateProductDto } from 'apps/api-gateway/src/product/dto/update-product.dto.js';
import { Prisma } from 'apps/product/generated/prisma/client.js';
import { DatabaseService } from './database/database.service.js';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly db: DatabaseService) {}

  createProduct(product: CreateProductDto) {
    return this.db.product.create({
      data: product,
    });
  }

  async updateProduct(id: string, product: UpdateProductDto) {
    try {
      return await this.db.product.update({
        where: { id },
        data: product,
      });
    } catch (error) {
      return this.handleNotFound(error, id);
    }
  }

  async deleteProduct(id: string) {
    try {
      return await this.db.product.delete({
        where: { id },
      });
    } catch (error) {
      return this.handleNotFound(error, id);
    }
  }

  // P2025: record to update/delete does not exist
  private handleNotFound(error: unknown, id: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      this.logger.warn(`Product ${id} not found`);
      return null;
    }
    throw error;
  }
}
