import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('/add')
  async createAUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      status: 201,
      message: "User created successful!",
      data: user
    });
  }

  @Get('/all')
  async getAll(@Res() res) {
    const users = await this.userService.getAll();
    return res.status(HttpStatus.OK).json({
      status: 200,
      data: users
    });
  }

  @Get("/userId")
  async getAUser(@Res() res, @Param('userId') _id: string) {
    const user = await this.userService.getAUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, data: user });
  }

  @Patch('/update/:userId')
  async updateUser(@Res() res, @Body() createUserDto: CreateUserDto, @Param("userId") _id: string) {
    const user = await this.userService.updateAUser(_id, createUserDto);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, data: user });
  }

  @Delete('/delete/:userId')
  async deleteAUser(@Res() res, @Param('userId') _id: string) {
    const user = await this.userService.deleteAUser(_id);
    if (!user)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, error: "User not found!" });
    return res.status(HttpStatus.OK).json({ status: 200, message: "Delete user successful" });
  }
}
