import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsDateString,
  Matches,
  Min,
} from 'class-validator';

export class CreateLandShipmentDto {

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
  warehouse_id: number;

  @IsString()
  @Matches(/^[A-Z]{3}[0-9]{3}$/, {
    message: 'vehicle_plate debe tener el formato AAA123',
  })
  vehicle_plate: string;

  @IsDateString()
  delivery_date: string;

}