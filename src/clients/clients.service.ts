import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Injectable()
export class ClientsService {

  constructor(private dataSource: DataSource) {}

  async getClients() {
    return this.dataSource.query(`EXEC SpGetClients`);
  }

  async getClientById(id: number) {
    const result = await this.dataSource.query(`EXEC SpGetClientById @id=${id}`);
    if (!result[0]) throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    return result[0];
  }

  async createClient(data: CreateClientDto) {
    const result = await this.dataSource.query(`
      EXEC SpCreateClient
      @name='${data.name}',
      @email='${data.email}',
      @phone='${data.phone ?? ''}'
    `);
    return result[0];
  }

  async updateClient(id: number, data: UpdateClientDto) {
    await this.getClientById(id);
    const result = await this.dataSource.query(`
      EXEC SpUpdateClient
      @id=${id},
      @name='${data.name}',
      @email='${data.email}',
      @phone='${data.phone ?? ''}'
    `);
    return result[0];
  }

  async deleteClient(id: number) {
    await this.getClientById(id);
    await this.dataSource.query(`EXEC SpDeleteClient @id=${id}`);
    return { message: 'Cliente eliminado correctamente' };
  }

}