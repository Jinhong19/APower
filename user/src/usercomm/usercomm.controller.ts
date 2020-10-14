import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { CreateUsercommDto } from './usercomm.dto';
import { UsercommService } from './usercomm.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';

@Controller('usercomm')
export class UsercommController {
  constructor(
    private service: UsercommService,
    private authService: AuthService,
  ) { }

  @Post('')
  async create(@Res() res: Response, @Body() dto: CreateUsercommDto) {
    const user = await this.service.create(dto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "Usercomm created successful!",
      data: user
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getOneByCommIdUserId(
    @Res() res,
    @Query() query
  ) {
    const obj = await this.service.getOne(query.comm_id, query.user_id);
    if (!obj)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({
        status: 404,
        message: "Usercomm not found!",
        data: null,
      });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get usercomm successful!",
      data: obj,
    });

  }

  @UseGuards(JwtAuthGuard)
  @Get('/id')
  async getIdByCommIdUserId(
    @Res() res,
    @Query() query
  ) {
    const id = await this.service.getId(query.comm_id, query.user_id);
    if (!id)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({
        status: 404,
        message: "Usercomm not found!",
        data: null,
      });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get usercomm successful!",
      data: id,
    });

  }

  @UseGuards(JwtAuthGuard)
  @Get('/comms/:id')
  async getCommsByUserId(@Res() res, @Param('id') id: string) {
    let objs = await this.service.getCommsByUserId(id);
    if (!objs) objs = [];
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get all communities successful!",
      data: objs,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/:id')
  async getUsersByCommId(@Res() res, @Param('id') id: string) {
    let objs = await this.service.getUsersByCommId(id);
    if (!objs) objs = [];
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Get all users successful!",
      data: objs,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Body() dto: CreateUsercommDto, @Param("id") id: string) {
    const obj = await this.service.update(id, dto);
    if (!obj)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "Usercomm not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Update usercomm successful!",
      data: obj,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async delete(
    @Res() res,
    @Body() dto: CreateUsercommDto
  ) {
    const obj = await this.service.delete(dto.comm_id, dto.user_id);
    if (!obj)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          status: 404,
          message: "Usercomm not found!",
          data: null,
        });
    return res.status(HttpStatus.OK).json({
      status: 200,
      message: "Delete usercomm successful",
      data: obj,
    });
  }
}
