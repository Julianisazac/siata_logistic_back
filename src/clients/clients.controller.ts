import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@ApiTags('👥 Clientes')
@Controller('clients')
export class ClientsController {

    constructor(private readonly clientsService: ClientsService) { }

    @Get()
    @ApiOperation({ 
      summary: '👥 Obtener todos los clientes', 
      description: 'Recuperar una lista completa de todos los clientes con su información de contacto e historial de envíos.' 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Clientes recuperados exitosamente',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', description: '🆔 Identificador único del cliente' },
            name: { type: 'string', description: '👤 Nombre del cliente' },
            email: { type: 'string', format: 'email', description: '📧 Dirección de correo' },
            phone: { type: 'string', description: '📱 Número de teléfono' },
            company: { type: 'string', description: '🏢 Nombre de la empresa' },
            createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de registro' }
          }
        }
      }
    })
    @ApiResponse({ status: 500, description: '❌ Error interno del servidor' })
    getClients() {
        return this.clientsService.getClients();
    }

    @Get(':id')
    @ApiOperation({ 
      summary: '🔍 Obtener cliente por ID', 
      description: 'Recuperar información detallada sobre un cliente específico incluyendo su historial de envíos y preferencias.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del cliente', 
      type: 'number', 
      example: 1 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Cliente recuperado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 ID del cliente' },
          name: { type: 'string', description: '👤 Nombre del cliente' },
          email: { type: 'string', format: 'email', description: '📧 Dirección de correo' },
          phone: { type: 'string', description: '📱 Número de teléfono' },
          company: { type: 'string', description: '🏢 Nombre de la empresa' },
          address: { type: 'string', description: '🏠 Dirección del cliente' },
          totalShipments: { type: 'number', description: '📦 Número total de envíos' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Cliente no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ ID de cliente inválido' })
    getClientById(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.getClientById(id);
    }

    @Post()
    @ApiOperation({ 
      summary: '➕ Crear nuevo cliente', 
      description: 'Registrar un nuevo cliente en el sistema con su información de contacto y detalles de la empresa.' 
    })
    @ApiBody({ 
      type: CreateClientDto,
      description: '📝 Información del nuevo cliente incluyendo detalles de contacto e información de la empresa'
    })
    @ApiResponse({ 
      status: 201, 
      description: '✅ Cliente creado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 ID del nuevo cliente' },
          name: { type: 'string', description: '👤 Nombre del cliente' },
          email: { type: 'string', format: 'email', description: '📧 Dirección de correo' },
          company: { type: 'string', description: '🏢 Nombre de la empresa' },
          createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de registro' }
        }
      }
    })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    @ApiResponse({ status: 409, description: '⚠️ El correo ya existe' })
    createClient(@Body() body: CreateClientDto) {
        return this.clientsService.createClient(body);
    }

    @Put(':id')
    @ApiOperation({ 
      summary: '✏️ Actualizar cliente', 
      description: 'Actualizar la información de un cliente existente. Solo los campos proporcionados serán actualizados.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del cliente', 
      type: 'number', 
      example: 1 
    })
    @ApiBody({ 
      type: UpdateClientDto,
      description: '📝 Información actualizada del cliente (se permite actualización parcial)'
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Cliente actualizado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 ID del cliente' },
          name: { type: 'string', description: '👤 Nombre actualizado del cliente' },
          email: { type: 'string', format: 'email', description: '📧 Correo actualizado' },
          updatedAt: { type: 'string', format: 'date-time', description: '📅 Fecha de última actualización' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Cliente no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    updateClient(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateClientDto) {
        return this.clientsService.updateClient(id, body);
    }

    @Delete(':id')
    @ApiOperation({ 
      summary: '🗑️ Eliminar cliente', 
      description: 'Eliminar un cliente del sistema. Esta acción no se puede deshacer.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del cliente', 
      type: 'number', 
      example: 1 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Cliente eliminado exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '💬 Mensaje de éxito' },
          deletedClientId: { type: 'number', description: '🆔 ID del cliente eliminado' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Cliente no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ ID de cliente inválido' })
    deleteClient(@Param('id', ParseIntPipe) id: number) {
        return this.clientsService.deleteClient(id);
    }

}