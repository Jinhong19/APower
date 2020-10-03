import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  // create user (store one password; can be deleted future)
  @Post('')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user
    });
  }

  // create user (store two passwords, and compare these two)
  @Post('/register')
  async register(@Res() res: Response, @Body() registerUserDto: RegisterUserDto) {

    const p1 = registerUserDto.password1;
    const p2 = registerUserDto.password2;

    if (p1 !== p2) {
      // console.log(`two password not equal: ${p1}/${p2}`)
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: "two password not equal!"
      });
    }

    let createUserDto = new(CreateUserDto);
    createUserDto.name = registerUserDto.name;
    createUserDto.password = p1;
    createUserDto.email = registerUserDto.email;

    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user
    });
  }

  // get all users (can be useful or not in future)
  @Get('')
  async getAll(@Res() res) {
    const users = await this.userService.getAll();
    return res.status(HttpStatus.OK).json({
      status: 200,
      data: users
    });
  }

  // get one user by user's id
  @Get(":id")
  async getOneUser(@Res() res, @Param('id') _id: string) {
    const user = await this.userService.getOneUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, data: user });
  }

  // update one user's information by user's id
  @Patch(':id')
  async updateUser(@Res() res, @Body() createUserDto: CreateUserDto, @Param("id") _id: string) {
    const user = await this.userService.updateOneUser(_id, createUserDto);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, data: user });
  }

  // delete one user by user's id
  @Delete(':id')
  async deleteOneUser(@Res() res, @Param('id') _id: string) {
    const user = await this.userService.deleteOneUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, message: "Delete user successful" });
  }
}
