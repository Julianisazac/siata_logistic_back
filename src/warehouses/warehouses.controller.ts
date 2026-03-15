import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto/warehouse.dto';

@Controller('warehouses')
export class WarehousesController {

    constructor(private readonly warehousesService: WarehousesService) { }

    @Get()
    getWarehouses() {
        return this.warehousesService.getWarehouses();
    }

    @Get(':id')
    getWarehouseById(@Param('id', ParseIntPipe) id: number) {
        return this.warehousesService.getWarehouseById(id);
    }

    @Post()
    createWarehouse(@Body() body: CreateWarehouseDto) {
        return this.warehousesService.createWarehouse(body);
    }

    @Put(':id')
    updateWarehouse(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateWarehouseDto) {
        return this.warehousesService.updateWarehouse(id, body);
    }

    @Delete(':id')
    deleteWarehouse(@Param('id', ParseIntPipe) id: number) {
        return this.warehousesService.deleteWarehouse(id);
    }

}