import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PortsService } from './ports.service';
import { CreatePortDto, UpdatePortDto } from './dto/port.dto';

@ApiTags('⚓ Puertos')
@Controller('ports')
export class PortsController {

    constructor(private readonly portsService: PortsService) { }

    @Get()
    @ApiOperation({ 
      summary: '⚓ Obtener todos los puertos', 
      description: 'Recuperar una lista completa de todos los puertos marítimos con sus detalles de ubicación, instalaciones y estado operacional.' 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Puertos recuperados exitosamente',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', description: '🆔 Identificador único del puerto' },
            name: { type: 'string', description: '🏷️ Nombre del puerto' },
            code: { type: 'string', description: '🔤 Código de puerto UN/LOCODE' },
            country: { type: 'string', description: '🌍 País' },
            city: { type: 'string', description: '🏙️ Ciudad' },
            coordinates: { type: 'string', description: '📍 Coordenadas GPS' },
            depth: { type: 'number', description: '🌊 Profundidad máxima (metros)' },
            facilities: { type: 'array', items: { type: 'string' }, description: '🏗️ Instalaciones disponibles' },
            isActive: { type: 'boolean', description: '✅ Estado operacional' },
            createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de creación' }
          }
        }
      }
    })
    @ApiResponse({ status: 500, description: '❌ Error interno del servidor' })
    getPorts() {
        return this.portsService.getPorts();
    }

    @Get(':id')
    @ApiOperation({ 
      summary: '🔍 Obtener puerto por ID', 
      description: 'Recuperar información detallada sobre un puerto específico incluyendo instalaciones, estadísticas de tráfico y detalles operativos.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del puerto', 
      type: 'number', 
      example: 1 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Puerto recuperado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 Identificador del puerto' },
          name: { type: 'string', description: '🏷️ Nombre del puerto' },
          code: { type: 'string', description: '🔤 Código de puerto oficial' },
          country: { type: 'string', description: '🌍 Ubicación del país' },
          city: { type: 'string', description: '🏙️ Ubicación de la ciudad' },
          coordinates: { type: 'string', description: '📍 Latitud y longitud' },
          depth: { type: 'number', description: '🌊 Profundidad máxima del buque' },
          area: { type: 'number', description: '📏 Tamaño del área del puerto (km²)' },
          facilities: { type: 'array', items: { type: 'string' }, description: '🏗️ Instalaciones disponibles' },
          trafficVolume: { type: 'number', description: '📊 Volumen de tráfico anual' },
          operatingHours: { type: 'string', description: '🕐 Horario de operación' },
          contact: { type: 'string', description: '📞 Contacto de la autoridad portuaria' },
          isActive: { type: 'boolean', description: '✅ Estado operacional' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Puerto no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ Identificador de puerto inválido' })
    getPortById(@Param('id', ParseIntPipe) id: number) {
        return this.portsService.getPortById(id);
    }

    @Post()
    @ApiOperation({ 
      summary: '➕ Crear nuevo puerto', 
      description: 'Registrar un nuevo puerto marítimo con detalles completos de ubicación, especificaciones de instalaciones e información operativa.' 
    })
    @ApiBody({ 
      type: CreatePortDto,
      description: '📝 Información del nuevo puerto incluyendo ubicación, instalaciones y detalles operativos'
    })
    @ApiResponse({ 
      status: 201, 
      description: '✅ Puerto creado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 Identificador del nuevo puerto' },
          name: { type: 'string', description: '🏷️ Nombre del puerto' },
          code: { type: 'string', description: '🔤 Código del puerto' },
          country: { type: 'string', description: '🌍 País' },
          city: { type: 'string', description: '🏙️ Ciudad' },
          depth: { type: 'number', description: '🌊 Profundidad máxima' },
          facilities: { type: 'array', items: { type: 'string' }, description: '🏗️ Instalaciones iniciales' },
          isActive: { type: 'boolean', description: '✅ Estado operacional inicial' },
          createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de creación' }
        }
      }
    })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    @ApiResponse({ status: 409, description: '⚠️ El código del puerto ya existe' })
    createPort(@Body() body: CreatePortDto) {
        return this.portsService.createPort(body);
    }

    @Put(':id')
    @ApiOperation({ 
      summary: '✏️ Actualizar puerto', 
      description: 'Actualizar la información de un puerto existente. Solo los campos proporcionados serán actualizados. Los cambios de instalaciones afectan las rutas de envío.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del puerto', 
      type: 'number', 
      example: 1 
    })
    @ApiBody({ 
      type: UpdatePortDto,
      description: '📝 Información actualizada del puerto (se permite actualización parcial)'
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Puerto actualizado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 Identificador del puerto' },
          name: { type: 'string', description: '🏷️ Nombre actualizado del puerto' },
          depth: { type: 'number', description: '🌊 Profundidad máxima actualizada' },
          facilities: { type: 'array', items: { type: 'string' }, description: '🏗️ Instalaciones actualizadas' },
          isActive: { type: 'boolean', description: '✅ Estado operacional actualizado' },
          updatedAt: { type: 'string', format: 'date-time', description: '📅 Fecha de última actualización' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Puerto no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    updatePort(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePortDto) {
        return this.portsService.updatePort(id, body);
    }

    @Delete(':id')
    @ApiOperation({ 
      summary: '🗑️ Eliminar puerto', 
      description: 'Eliminar un puerto del sistema. Esta acción no se puede deshacer y afectará todos los envíos marítimos y rutas.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del puerto', 
      type: 'number', 
      example: 1 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Puerto eliminado exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '💬 Mensaje de éxito' },
          deletedPortId: { type: 'number', description: '🆔 Identificador del puerto eliminado' },
          affectedShipments: { type: 'number', description: '🚢 Número de envíos marítimos afectados' },
          affectedRoutes: { type: 'number', description: '🗺️ Número de rutas de envío afectadas' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Puerto no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ Identificador de puerto inválido' })
    deletePort(@Param('id', ParseIntPipe) id: number) {
        return this.portsService.deletePort(id);
    }

}