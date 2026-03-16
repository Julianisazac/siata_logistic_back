import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto/warehouse.dto';

@ApiTags('🏭 Almacenes')
@Controller('warehouses')
export class WarehousesController {

    constructor(private readonly warehousesService: WarehousesService) { }

    @Get()
    @ApiOperation({ 
      summary: '🏭 Obtener todos los almacenes', 
      description: 'Recuperar una lista completa de todos los almacenes con sus detalles de ubicación, capacidad y estado de ocupación actual.' 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Almacenes recuperados exitosamente',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', description: '🆔 Identificador único del almacén' },
            name: { type: 'string', description: '🏷️ Nombre del almacén' },
            location: { type: 'string', description: '📍 Ubicación del almacén' },
            address: { type: 'string', description: '🏠 Dirección completa' },
            capacity: { type: 'number', description: '📊 Capacidad máxima' },
            currentOccupancy: { type: 'number', description: '📦 Ocupación actual' },
            manager: { type: 'string', description: '👤 Administrador del almacén' },
            contact: { type: 'string', description: '📞 Información de contacto' },
            isActive: { type: 'boolean', description: '✅ Estado operacional' },
            createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de creación' }
          }
        }
      }
    })
    @ApiResponse({ status: 500, description: '❌ Error interno del servidor' })
    getWarehouses() {
        return this.warehousesService.getWarehouses();
    }

    @Get(':id')
    @ApiOperation({ 
      summary: '🔍 Obtener almacén por ID', 
      description: 'Recuperar información detallada sobre un almacén específico incluyendo inventario, personal y métricas operativas.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del almacén', 
      type: 'number', 
      example: 1 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Almacén recuperado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 Identificador del almacén' },
          name: { type: 'string', description: '🏷️ Nombre del almacén' },
          location: { type: 'string', description: '📍 Ubicación geográfica' },
          address: { type: 'string', description: '🏠 Dirección completa' },
          capacity: { type: 'number', description: '📊 Capacidad máxima de almacenamiento' },
          currentOccupancy: { type: 'number', description: '📦 Uso de almacenamiento actual' },
          occupancyRate: { type: 'number', description: '📈 Porcentaje de ocupación' },
          manager: { type: 'string', description: '👤 Nombre del administrador del almacén' },
          contact: { type: 'string', description: '📞 Teléfono/contacto del administrador' },
          operatingHours: { type: 'string', description: '🕐 Horario de operación' },
          specialties: { type: 'array', items: { type: 'string' }, description: '🎯 Especialidades de almacenamiento' },
          isActive: { type: 'boolean', description: '✅ Estado operacional' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Almacén no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ Identificador de almacén inválido' })
    getWarehouseById(@Param('id', ParseIntPipe) id: number) {
        return this.warehousesService.getWarehouseById(id);
    }

    @Post()
    @ApiOperation({ 
      summary: '➕ Crear nuevo almacén', 
      description: 'Registrar una nueva instalación de almacenamiento con detalles completos de ubicación, especificaciones de capacidad e información operativa.' 
    })
    @ApiBody({ 
      type: CreateWarehouseDto,
      description: '📝 Información del nuevo almacén incluyendo ubicación, capacidad y detalles operativos'
    })
    @ApiResponse({ 
      status: 201, 
      description: '✅ Almacén creado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 Identificador del nuevo almacén' },
          name: { type: 'string', description: '🏷️ Nombre del almacén' },
          location: { type: 'string', description: '📍 Ubicación del almacén' },
          capacity: { type: 'number', description: '📊 Capacidad máxima' },
          manager: { type: 'string', description: '👤 Administrador asignado' },
          isActive: { type: 'boolean', description: '✅ Estado operacional inicial' },
          createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de creación' }
        }
      }
    })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    @ApiResponse({ status: 409, description: '⚠️ El nombre del almacén ya existe' })
    createWarehouse(@Body() body: CreateWarehouseDto) {
        return this.warehousesService.createWarehouse(body);
    }

    @Put(':id')
    @ApiOperation({ 
      summary: '✏️ Actualizar almacén', 
      description: 'Actualizar la información de un almacén existente. Solo los campos proporcionados serán actualizados. Los cambios de capacidad afectan la planificación de inventario.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del almacén', 
      type: 'number', 
      example: 1 
    })
    @ApiBody({ 
      type: UpdateWarehouseDto,
      description: '📝 Información actualizada del almacén (se permite actualización parcial)'
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Almacén actualizado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 Identificador del almacén' },
          name: { type: 'string', description: '🏷️ Nombre actualizado del almacén' },
          capacity: { type: 'number', description: '📊 Capacidad actualizada' },
          manager: { type: 'string', description: '👤 Administrador actualizado' },
          isActive: { type: 'boolean', description: '✅ Estado operacional actualizado' },
          updatedAt: { type: 'string', format: 'date-time', description: '📅 Fecha de última actualización' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Almacén no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    updateWarehouse(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateWarehouseDto) {
        return this.warehousesService.updateWarehouse(id, body);
    }

    @Delete(':id')
    @ApiOperation({ 
      summary: '🗑️ Eliminar almacén', 
      description: 'Eliminar un almacén del sistema. Esta acción no se puede deshacer y afectará todo el inventario almacenado.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del almacén', 
      type: 'number', 
      example: 1 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Almacén eliminado exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '💬 Mensaje de éxito' },
          deletedWarehouseId: { type: 'number', description: '🆔 Identificador del almacén eliminado' },
          relocatedProducts: { type: 'number', description: '📦 Número de productos reubicados' },
          affectedShipments: { type: 'number', description: '🚚 Número de envíos afectados' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Almacén no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ Identificador de almacén inválido' })
    deleteWarehouse(@Param('id', ParseIntPipe) id: number) {
        return this.warehousesService.deleteWarehouse(id);
    }

}