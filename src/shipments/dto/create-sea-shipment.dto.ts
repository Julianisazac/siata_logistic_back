import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsDateString,
  Matches,
  Min,
} from 'class-validator';

export class CreateSeaShipmentDto {

  @IsInt()
  @IsPositive()
  client_id: number;

  @IsInt()
  @IsPositive()
  product_id: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  port_id: number;

  @IsString()
  @Matches(/^[A-Z]{3}[0-9]{4}[A-Z]{1}$/, {
    message: 'fleet_number debe tener el formato AAA1234A',
  })
  fleet_number: string;

  @IsDateString()
  delivery_date: string;

}