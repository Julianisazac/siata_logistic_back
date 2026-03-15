import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateLandShipmentDto } from './dto/create-land-shipment.dto';
import { CreateSeaShipmentDto } from './dto/create-sea-shipment.dto';

@Controller('shipments')
export class ShipmentsController {

    constructor(private readonly shipmentsService: ShipmentsService) { }

    @Get()
    getShipments() {
        return this.shipmentsService.getShipments();
    }

    @Post('land')
    createLandShipment(@Body() body: CreateLandShipmentDto) {
        console.log("BODY RECIBIDO:");
        console.log(body);
        return this.shipmentsService.createLandShipment(body);
    }

    @Post('sea')
    createSeaShipment(@Body() body: CreateSeaShipmentDto) {
        return this.shipmentsService.createSeaShipment(body);
    } 

}