import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatePortDto, UpdatePortDto } from './dto/port.dto';

@Injectable()
export class PortsService {

    constructor(private dataSource: DataSource) { }

    async getPorts() {
        return this.dataSource.query(`EXEC SpGetPorts`);
    }

    async getPortById(id: number) {
        const result = await this.dataSource.query(`EXEC SpGetPortById @id=${id}`);
        if (!result[0]) throw new NotFoundException(`Puerto con id ${id} no encontrado`);
        return result[0];
    }

    async createPort(data: CreatePortDto) {
        const result = await this.dataSource.query(`
      EXEC SpCreatePort
      @name='${data.name}',
      @city='${data.city ?? ''}',
      @country='${data.country ?? ''}'
    `);
        return result[0];
    }

    async updatePort(id: number, data: UpdatePortDto) {
        await this.getPortById(id);
        const result = await this.dataSource.query(`
      EXEC SpUpdatePort
      @id=${id},
      @name='${data.name}',
      @city='${data.city ?? ''}',
      @country='${data.country ?? ''}'
    `);
        return result[0];
    }

    async deletePort(id: number) {
        await this.getPortById(id);
        await this.dataSource.query(`EXEC SpDeletePort @id=${id}`);
        return { message: 'Puerto eliminado correctamente' };
    }

}