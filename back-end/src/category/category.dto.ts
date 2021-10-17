import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  maxPeople: number;

  @IsNotEmpty()
  @IsString()
  price_per_hour: number;

  @IsNotEmpty()
  @MaxLength(20, {
    each: true,
  })
  services: string[];
}
export class EditCategoryDto {
  @IsString()
  name: string;

  @IsString()
  maxPeople: number;

  @IsString()
  price_per_hour: number;

  @MaxLength(20, {
    each: true,
  })
  services: string[];
}
