import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ShipmentsService } from './shipments.service';
import { CreateLandShipmentDto } from './dto/create-land-shipment.dto';
import { CreateSeaShipmentDto } from './dto/create-sea-shipment.dto';

@ApiTags('🚚 Envíos')
@Controller('shipments')
export class ShipmentsController {

    constructor(private readonly shipmentsService: ShipmentsService) { }

    @Get()
    @ApiOperation({ 
      summary: '📋 Obtener todos los envíos', 
      description: 'Recuperar una lista completa de todos los envíos (tanto terrestres como marítimos) con su estado actual y detalles.' 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Envíos recuperados exitosamente',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', description: '🆔 Identificador único del envío' },
            type: { type: 'string', enum: ['LAND', 'SEA'], description: '🚚🚢 Tipo de envío' },
            status: { type: 'string', description: '📊 Estado actual del envío' },
            origin: { type: 'string', description: '📍 Ubicación de origen' },
            destination: { type: 'string', description: '🎯 Ubicación de destino' },
            createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de creación' }
          }
        }
      }
    })
    @ApiResponse({ status: 500, description: '❌ Error interno del servidor' })
    getShipments() {
        return this.shipmentsService.getShipments();
    }

    @Post('land')
    @ApiOperation({ 
      summary: '🚚 Crear envío terrestre', 
      description: 'Crear un nuevo envío terrestre con detalles del transporte por camión. Perfecto para logística terrestre y envíos nacionales.' 
    })
    @ApiBody({ 
      type: CreateLandShipmentDto,
      description: '📝 Detalles del envío terrestre incluyendo información del camión y especificaciones de la ruta'
    })
    @ApiResponse({ 
      status: 201, 
      description: '✅ Envío terrestre creado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 ID del envío' },
          type: { type: 'string', enum: ['LAND'], description: '🚚 Tipo de envío' },
          truckPlate: { type: 'string', description: '🚛 Placa del camión' },
          driverName: { type: 'string', description: '👨‍✈️ Nombre del conductor' },
          route: { type: 'string', description: '🛣️ Ruta de envío' }
        }
      }
    })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    @ApiResponse({ status: 500, description: '❌ Error interno del servidor' })
    createLandShipment(@Body() body: CreateLandShipmentDto) {
        console.log("BODY RECIBIDO:");
        console.log(body);
        return this.shipmentsService.createLandShipment(body);
    }

    @Post('sea')
    @ApiOperation({ 
      summary: '🚢 Crear envío marítimo', 
      description: 'Crear un nuevo envío marítimo con detalles del buque y del puerto. Ideal para logística marítima internacional.' 
    })
    @ApiBody({ 
      type: CreateSeaShipmentDto,
      description: '📝 Detalles del envío marítimo incluyendo información del buque y especificaciones del puerto'
    })
    @ApiResponse({ 
      status: 201, 
      description: '✅ Envío marítimo creado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 ID del envío' },
          type: { type: 'string', enum: ['SEA'], description: '🚢 Tipo de envío' },
          vesselName: { type: 'string', description: '🚢 Nombre del buque' },
          departurePort: { type: 'string', description: '⚓ Puerto de salida' },
          arrivalPort: { type: 'string', description: '🏁 Puerto de llegada' }
        }
      }
    })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    @ApiResponse({ status: 500, description: '❌ Error interno del servidor' })
    createSeaShipment(@Body() body: CreateSeaShipmentDto) {
        return this.shipmentsService.createSeaShipment(body);
    } 

}