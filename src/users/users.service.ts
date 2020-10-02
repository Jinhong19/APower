import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


  async getAUser(userId): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async updateAUser(_id, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(_id, createUserDto, { new: true });
    return user;
  }

  async deleteAUser(_id): Promise<any> {
    const user = await this.userModel.findByIdAndRemove(_id);
    return user;
  }
}
