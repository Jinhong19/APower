import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from './../auth/local-auth.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';
import { UsersService } from './users.service';
import { UsercommService } from './../usercomm/usercomm.service';
import { CreateUserDto, RegisterUserDto } from './user.dto';
import { CommunityDto } from './../usercomm/usercomm.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private usercommService: UsercommService,
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

  @Post('community')
  async createComm(@Res() res: Response, @Body() communityDto: CommunityDto) {
    const usercomm = await this.usercommService.createComm(communityDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "Created successful!",
      data: usercomm
    });
  }

  @Get('community/:userid')
  async getAllByUser(@Res() res, @Param('userid') userid: string) {
    const comms = await this.usercommService.getAllCommunityByUserid(userid);
    if (!comms)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "Can't find any community!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get user's community list successful!",
      data: comms,
    });
  }

  @Get('community/:commid')
  async getAllByComm(@Res() res, @Param('commid') commid: string) {
    const users = await this.usercommService.getAllUserByCommid(commid);
    if (!users)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "Can't find any user!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get this community's user list successful!",
      data: users,
    });
  }

  @Delete(':userid/:commid')
  async deleteOneComm(@Res() res, @Param('userid') userid: string, @Param('commid') commid: string,) {
    const usercomm = await this.usercommService.deleteOneUserComm({userid, commid});
    if (!usercomm)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "This record not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Delete successful",
      data: usercomm,
    });
  }
}
