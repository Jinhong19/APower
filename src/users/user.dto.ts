import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsEnum, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(6, {
    // here, $constraint1 will be replaced with "6", and $value with actual supplied value
    message: 'Username is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    // here, $constraint1 will be replaced with "20", and $value with actual supplied value
    message: 'Username is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Username is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    message: 'Username is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    message: 'Password is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  password1: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    message: 'Password is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  password2: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}