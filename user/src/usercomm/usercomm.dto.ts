import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsEnum, IsInt } from 'class-validator';

export class CreateUsercommDto {
    @IsNotEmpty()
    user_id: string;
  
    @IsNotEmpty()
    comm_id: string;
  }