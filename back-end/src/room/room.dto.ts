import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/([1-9]0[1-9])/, {
    message:
      'Expected format 103,502. 1st digit represent floor number and 2nd digit room no.',
  })
  roomNumber: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
