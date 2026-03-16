import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('📦 Productos')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ 
      summary: '📦 Obtener todos los productos', 
      description: 'Recuperar un catálogo completo de todos los productos con su estado de inventario, precios y especificaciones.' 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Productos recuperados exitosamente',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', description: '🆔 Identificador único del producto' },
            name: { type: 'string', description: '📛 Nombre del producto' },
            description: { type: 'string', description: '📝 Descripción del producto' },
            price: { type: 'number', description: '💰 Precio del producto' },
            stock: { type: 'number', description: '📊 Stock disponible' },
            category: { type: 'string', description: '🏷️ Categoría del producto' },
            weight: { type: 'number', description: '⚖️ Peso del producto (kg)' },
            dimensions: { type: 'string', description: '📏 Dimensiones del producto' },
            createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de creación' }
          }
        }
      }
    })
    @ApiResponse({ status: 500, description: '❌ Error interno del servidor' })
    getProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    @ApiOperation({ 
      summary: '🔍 Obtener producto por ID', 
      description: 'Recuperar información detallada sobre un producto específico incluyendo historial de inventario y requisitos de envío.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del producto', 
      type: 'number', 
      example: 1 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Producto recuperado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 ID del producto' },
          name: { type: 'string', description: '📛 Nombre del producto' },
          description: { type: 'string', description: '📝 Descripción detallada del producto' },
          price: { type: 'number', description: '💰 Precio actual' },
          stock: { type: 'number', description: '📊 Cantidad de stock disponible' },
          category: { type: 'string', description: '🏷️ Categoría del producto' },
          weight: { type: 'number', description: '⚖️ Peso en kilogramos' },
          dimensions: { type: 'string', description: '📏 Dimensiones L x A x A' },
          minStock: { type: 'number', description: '⚠️ Nivel mínimo de stock' },
          lastRestock: { type: 'string', format: 'date-time', description: '📅 Fecha del último reabastecimiento' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Producto no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ ID de producto inválido' })
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getProductById(id);
    }

    @Post()
    @ApiOperation({ 
      summary: '➕ Crear nuevo producto', 
      description: 'Agregar un nuevo producto al catálogo con especificaciones completas, precios e información de inventario.' 
    })
    @ApiBody({ 
      type: CreateProductDto,
      description: '📝 Información del nuevo producto incluyendo especificaciones, precios e stock inicial'
    })
    @ApiResponse({ 
      status: 201, 
      description: '✅ Producto creado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 ID del nuevo producto' },
          name: { type: 'string', description: '📛 Nombre del producto' },
          price: { type: 'number', description: '💰 Precio del producto' },
          stock: { type: 'number', description: '📊 Cantidad inicial de stock' },
          category: { type: 'string', description: '🏷️ Categoría del producto' },
          createdAt: { type: 'string', format: 'date-time', description: '📅 Fecha de creación' }
        }
      }
    })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    @ApiResponse({ status: 409, description: '⚠️ El nombre del producto ya existe' })
    createProduct(@Body() body: CreateProductDto) {
        return this.productsService.createProduct(body);
    }

    @Put(':id')
    @ApiOperation({ 
      summary: '✏️ Actualizar producto', 
      description: 'Actualizar la información de un producto existente. Solo los campos proporcionados serán actualizados. Los cambios de stock son registrados.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del producto', 
      type: 'number', 
      example: 1 
    })
    @ApiBody({ 
      type: UpdateProductDto,
      description: '📝 Información actualizada del producto (se permite actualización parcial)'
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Producto actualizado exitosamente',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: '🆔 ID del producto' },
          name: { type: 'string', description: '📛 Nombre actualizado del producto' },
          price: { type: 'number', description: '💰 Precio actualizado' },
          stock: { type: 'number', description: '📊 Cantidad de stock actualizada' },
          updatedAt: { type: 'string', format: 'date-time', description: '📅 Fecha de última actualización' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Producto no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ Datos de entrada inválidos' })
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
        return this.productsService.updateProduct(id, body);
    }

    @Delete(':id')
    @ApiOperation({ 
      summary: '🗑️ Eliminar producto', 
      description: 'Eliminar un producto del catálogo. Esta acción no se puede deshacer y afectará los registros de inventario.' 
    })
    @ApiParam({ 
      name: 'id', 
      description: '🆔 Identificador único del producto', 
      type: 'number', 
      example: 1 
    })
    @ApiResponse({ 
      status: 200, 
      description: '✅ Producto eliminado exitosamente',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '💬 Mensaje de éxito' },
          deletedProductId: { type: 'number', description: '🆔 ID del producto eliminado' },
          affectedShipments: { type: 'number', description: '📦 Número de envíos afectados' }
        }
      }
    })
    @ApiResponse({ status: 404, description: '❌ Producto no encontrado' })
    @ApiResponse({ status: 400, description: '⚠️ ID de producto inválido' })
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProduct(id);
    }

}