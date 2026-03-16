import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(new AllExceptionsFilter());

  // 🚀 Configuración de Swagger - Documentación de la API 📚
  const config = new DocumentBuilder()
    .setTitle('🚚 API SIATA Logistics')
    .setDescription(`
      📦 **¡Bienvenido a la API Backend de SIATA Logistics!** 🚢
      
      Esta API integral gestiona todas las operaciones logísticas incluyendo:
      🚚 **Envíos** - Gestión de transporte terrestre y marítimo
      👥 **Clientes** - Gestión de relaciones con clientes  
      📦 **Productos** - Catálogo de inventario y productos
      🏭 **Almacenes** - Gestión de instalaciones de almacenamiento
      ⚓ **Puertos** - Operaciones de puertos marítimos
      
      🔧 **Características:**
      • ✅ Operaciones CRUD completas
      • 🛡️ Validación y saneamiento de entradas
      • 🌍 CORS habilitado para frontend
      • 📊 Manejo integral de errores
      • 🚀 Integración de alto rendimiento con TypeORM
      
      📝 **Uso:**
      • Todos los endpoints devuelven respuestas JSON
      • Errores de validación devuelven estado 400
      • Autenticación no requerida (por ahora)
      • Base de datos: SQL Server con TypeORM
    `)
    .setVersion('1.0.0')
    .setContact('Equipo SIATA Logistics', 'https://siata-logistics.com', 'soporte@siata-logistics.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addTag('🚚 Envíos', 'Gestión de envíos terrestres y marítimos')
    .addTag('👥 Clientes', 'Operaciones de gestión de clientes')
    .addTag('📦 Productos', 'Catálogo de productos e inventario')
    .addTag('🏭 Almacenes', 'Gestión de instalaciones de almacenamiento')
    .addTag('⚓ Puertos', 'Operaciones de puertos marítimos')
    .addServer('http://localhost:3000', 'Servidor de Desarrollo 🚧')
    .addServer('https://api.siata-logistics.com', 'Servidor de Producción 🚀')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: '🚚 Documentación de la API SIATA Logistics',
    customCss: `
      .topbar-wrapper img { content:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMTAiIGZpbGw9IiM0Mjk5ZTEiLz4KPHRleHQgeD0iMjUiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wnrHPC9zY3JpcHQ+Cjwvc3ZnPgo='); }
      .swagger-ui .topbar { background-color: #4299e1; }
      .swagger-ui .topbar-wrapper .link { color: white; }
      .swagger-ui .info .title { color: #4299e1; }
    `,
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: false,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      docExpansion: 'none',
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
    }
  });

  console.log('🚀 La API SIATA Logistics está corriendo en el puerto 3000');
  console.log('📚 Documentación de Swagger disponible en: http://localhost:3000/api/docs');

  await app.listen(3000);
}
bootstrap();