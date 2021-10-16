import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, {
    message:
      'Mobile number should be bangladeshi mobile number. Ex: 01910000000 or +8801910000000',
  })
  mobile: string;
}
