import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductService {
    constructor(@Inject('KAFKA_PRODUCT_CLIENT') private readonly kafkaClient: any) {}

    async onModuleInit() {
        await this.kafkaClient.connect();
    }

    async emitCreateProduct(product: CreateProductDto) {
        try {
            await this.kafkaClient.emit('product.created', product);
        } catch (error) {
            console.error('Error occurred while emitting product creation event:', error);
            throw new InternalServerErrorException('Failed to emit product creation event');
        }
    }

    async emitUpdateProduct(id: string, product: UpdateProductDto) {
        try {
            await this.kafkaClient.emit('product.updated', { id, ...product });
        } catch (error) {
            console.error('Error occurred while emitting product update event:', error);
            throw new InternalServerErrorException('Failed to emit product update event');
        }
    }

    async emitDeleteProduct(id: string) {
        try {
            await this.kafkaClient.emit('product.deleted', { id });
        } catch (error) {
            console.error('Error occurred while emitting product deletion event:', error);
            throw new InternalServerErrorException('Failed to emit product deletion event');
        }
    }
}
