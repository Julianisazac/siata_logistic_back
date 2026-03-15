import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto/warehouse.dto';

@Injectable()
export class WarehousesService {

    constructor(private dataSource: DataSource) { }

    async getWarehouses() {
        return this.dataSource.query(`EXEC SpGetWarehouses`);
    }

    async getWarehouseById(id: number) {
        const result = await this.dataSource.query(`EXEC SpGetWarehouseById @id=${id}`);
        if (!result[0]) throw new NotFoundException(`Bodega con id ${id} no encontrada`);
        return result[0];
    }

    async createWarehouse(data: CreateWarehouseDto) {
        const result = await this.dataSource.query(`
      EXEC SpCreateWarehouse
      @name='${data.name}',
      @location='${data.location ?? ''}',
      @country='${data.country ?? ''}'
    `);
        return result[0];
    }

    async updateWarehouse(id: number, data: UpdateWarehouseDto) {
        await this.getWarehouseById(id);
        const result = await this.dataSource.query(`
      EXEC SpUpdateWarehouse
      @id=${id},
      @name='${data.name}',
      @location='${data.location ?? ''}',
      @country='${data.country ?? ''}'
    `);
        return result[0];
    }

    async deleteWarehouse(id: number) {
        await this.getWarehouseById(id);
        await this.dataSource.query(`EXEC SpDeleteWarehouse @id=${id}`);
        return { message: 'Bodega eliminada correctamente' };
    }

}