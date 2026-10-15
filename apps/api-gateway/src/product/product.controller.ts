import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async createProduct() {
        const newProduct = {
            id: String(Math.floor(Math.random() * 1000)),
            name: 'Sample Product',
            price: Number(Math.floor(Math.random() * 100).toFixed(2)),
        };
        await this.productService.emitCreateProduct(newProduct);
        
        return {
            message: 'Product created successfully',
            product: newProduct,
        }
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        await this.productService.emitUpdateProduct(id, updateProductDto);

        return {
            message: 'Product updated successfully',
            product: {
                id,
                ...updateProductDto,
            },
        }
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        await this.productService.emitDeleteProduct(id);

        return {
            message: 'Product deleted successfully',
        }
    }
}
