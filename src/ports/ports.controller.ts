import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PortsService } from './ports.service';
import { CreatePortDto, UpdatePortDto } from './dto/port.dto';

@Controller('ports')
export class PortsController {

    constructor(private readonly portsService: PortsService) { }

    @Get()
    getPorts() {
        return this.portsService.getPorts();
    }

    @Get(':id')
    getPortById(@Param('id', ParseIntPipe) id: number) {
        return this.portsService.getPortById(id);
    }

    @Post()
    createPort(@Body() body: CreatePortDto) {
        return this.portsService.createPort(body);
    }

    @Put(':id')
    updatePort(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePortDto) {
        return this.portsService.updatePort(id, body);
    }

    @Delete(':id')
    deletePort(@Param('id', ParseIntPipe) id: number) {
        return this.portsService.deletePort(id);
    }

}