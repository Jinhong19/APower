import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";

import { User } from './user.interface';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSaltSync(8);
    const hash = await bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.password = hash;
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // Can be useful or not in future
  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getOneUser(userId): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async updateOneUser(_id, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(_id, createUserDto, { new: true });
    return user;
  }

  // Can be useful or not in future
  async deleteOneUser(_id): Promise<any> {
    const user = await this.userModel.findByIdAndRemove(_id);
    return user;
  }
}
