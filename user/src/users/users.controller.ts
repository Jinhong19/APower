import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, Res, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from './../auth/local-auth.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) { }

  @Post('')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user
    });
  }

  @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body) {
    // console.log(body);
    return this.authService.login(body.username, body.password);
  }

  @Post('/register')
  async register(@Res() res: Response, @Body() registerUserDto: RegisterUserDto) {
    // console.log(registerUserDto);

    const p1 = registerUserDto.password1;
    const p2 = registerUserDto.password2;

    if (p1 !== p2) {
      // console.log(`two password not equal: ${p1}/${p2}`)
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: "Two password not equal!",
        data: null,
      });
    }

    let createUserDto = new(CreateUserDto);
    createUserDto.name = registerUserDto.name;
    createUserDto.password = p1;
    createUserDto.email = registerUserDto.email;

    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAll(@Res() res) {
    const users = await this.usersService.getAll();
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get all users successful!",
      data: users,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getOne(@Res() res, @Param('id') _id: string) {
    const user = await this.usersService.getOneUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "User not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get user successful!",
      data: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Post('id')
  async getIdByName(@Res() res, @Body() body) {
    const id = await this.usersService.getOneUserIdByName(body.username);
    if (!id)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({
        status: 404,
        message: "User not found!",
        data: null,
      });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get user's id successful!",
      data: id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Body() createUserDto: CreateUserDto, @Param("id") _id: string) {
    const user = await this.usersService.updateOneUser(_id, createUserDto);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "User not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Update user successful!",
      data: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Res() res, @Param('id') _id: string) {
    const user = await this.usersService.deleteOneUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "User not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Delete user successful",
      data: user,
    });
  }
}
