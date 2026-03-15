import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {

    constructor(private dataSource: DataSource) { }

    async getProducts() {

        return this.dataSource.query(`EXEC SpGetProducts`);
    }

    async getProductById(id: number) {
        const result = await this.dataSource.query(`EXEC SpGetProductById @id=${id}`);
        if (!result[0]) throw new NotFoundException(`Producto con id ${id} no encontrado`);
        return result[0];
    }

    async createProduct(data: CreateProductDto) {
        const result = await this.dataSource.query(`
      EXEC SpCreateProduct
      @name='${data.name}',
      @description='${data.description ?? ''}'
    `);
        return result[0];
    }

    async updateProduct(id: number, data: UpdateProductDto) {
        await this.getProductById(id);
        const result = await this.dataSource.query(`
      EXEC SpUpdateProduct
      @id=${id},
      @name='${data.name}',
      @description='${data.description ?? ''}'
    `);
        return result[0];
    }

    async deleteProduct(id: number) {
        await this.getProductById(id);
        await this.dataSource.query(`EXEC SpDeleteProduct @id=${id}`);
        return { message: 'Producto eliminado correctamente' };
    }

}