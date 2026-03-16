import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/auth.dto';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const result = await this.dataSource.query(`
        EXEC SpCreateUser
        @email='${data.email}',
        @password='${hashedPassword}'
      `);
      return {
        message: 'Usuario registrado correctamente',
        user: result[0],
      };
    } catch (error) {
      if (error?.message?.includes('ya está registrado')) {
        throw new BadRequestException('El email ya está registrado');
      }
      throw error;
    }
  }

  async login(data: LoginDto) {
    const result = await this.dataSource.query(`
      EXEC SpGetUserByEmail @email='${data.email}'
    `);

    const user = result[0];

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValid = await bcrypt.compare(data.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: { id: user.id, email: user.email },
    };
  }

}