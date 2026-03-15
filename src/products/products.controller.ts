import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getProductById(id);
    }

    @Post()
    createProduct(@Body() body: CreateProductDto) {
        return this.productsService.createProduct(body);
    }

    @Put(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
        return this.productsService.updateProduct(id, body);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProduct(id);
    }

}