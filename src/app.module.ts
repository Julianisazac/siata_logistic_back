import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsModule } from './shipments/shipments.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { PortsModule } from './ports/ports.module';
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mssql',
        host: config.get<string>('DB_HOST'),
        port: +config.get<string>('DB_PORT')!,
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        options: {
          trustServerCertificate: true,
          encrypt: false,
          instanceName: 'SQLEXPRESS',
        },
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ShipmentsModule,
    ClientsModule,
    ProductsModule,
    WarehousesModule,
    PortsModule,
  ],
})
export class AppModule {}