import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateLandShipmentDto } from './dto/create-land-shipment.dto';
import { CreateSeaShipmentDto } from './dto/create-sea-shipment.dto';

@Injectable()
export class ShipmentsService {

  constructor(private dataSource: DataSource) {}

  private generateTrackingNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async getShipments() {
    return this.dataSource.query(`EXEC SpGetShipments`);
  }

  async createLandShipment(data: CreateLandShipmentDto) {
    try {
      const subtotal = data.price * data.quantity;
      const discount = data.quantity > 10 ? subtotal * 0.05 : 0;
      const total_price = subtotal - discount;
      const tracking_number = this.generateTrackingNumber();

      const query = `
        EXEC SpCreateLandShipment
        @client_id=${data.client_id},
        @product_id=${data.product_id},
        @quantity=${data.quantity},
        @price=${data.price},
        @warehouse_id=${data.warehouse_id},
        @vehicle_plate='${data.vehicle_plate}',
        @delivery_date='${data.delivery_date}',
        @discount=${discount},
        @total_price=${total_price},
        @tracking_number='${tracking_number}'
      `;

      return await this.dataSource.query(query);

    } catch (error) {
      this.handleSqlError(error);
    }
  }

  async createSeaShipment(data: CreateSeaShipmentDto) {
    try {
      const subtotal = data.price * data.quantity;
      const discount = data.quantity > 10 ? subtotal * 0.03 : 0;
      const total_price = subtotal - discount;
      const tracking_number = this.generateTrackingNumber();

      const query = `
        EXEC SpCreateSeaShipment
        @client_id=${data.client_id},
        @product_id=${data.product_id},
        @quantity=${data.quantity},
        @price=${data.price},
        @port_id=${data.port_id},
        @fleet_number='${data.fleet_number}',
        @delivery_date='${data.delivery_date}',
        @discount=${discount},
        @total_price=${total_price},
        @tracking_number='${tracking_number}'
      `;

      return await this.dataSource.query(query);

    } catch (error) {
      this.handleSqlError(error);
    }
  }

  private handleSqlError(error: any) {
    if (error?.number === 547 || error?.precedingErrors?.some((e: any) => e.number === 547)) {
      throw new BadRequestException('Uno de los IDs enviados no existe (cliente, producto, bodega o puerto)');
    }

    if (error?.number === 2627 || error?.number === 2601) {
      throw new BadRequestException('Ya existe un envío con ese número de guía');
    }

    throw error;
  }

}