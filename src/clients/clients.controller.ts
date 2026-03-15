import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientsController {

    constructor(private readonly clientsService: ClientsService) { }

    @Get()
    getClients() {
        return this.clientsService.getClients();
    }

    @Get(':id')
    getClientById(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.getClientById(id);
    }

    @Post()
    createClient(@Body() body: CreateClientDto) {
        return this.clientsService.createClient(body);
    }

    @Put(':id')
    updateClient(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateClientDto) {
        return this.clientsService.updateClient(id, body);
    }

    @Delete(':id')
    deleteClient(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.deleteClient(id);
    }

}