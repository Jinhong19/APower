import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";

import { User, UserDocument } from './user.schema';
import { Usercomm, UsercommDocument } from '../usercomm/usercomm.schema';
import { CreateUserDto} from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSaltSync(8);
    const hash = await bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.password = hash;
    const createdUser = new this.model(createUserDto);
    return createdUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.model.find().exec();
  }

  async getOneUser(userId): Promise<User | undefined> {
    const user = await this.model.findById(userId).exec();
    return user;
  }

  async getOneUserByName(name): Promise<User | undefined> {
    const user = await this.model.findOne({ name }).exec();
    return user;
  }

  async getOneUserByNamePassword({username, password}): Promise<User | undefined> {
    const user = await this.model.findOne({ name: username }).exec();

    // check account found and verify password
    if (!user || !bcrypt.compareSync(password, user.password)) {
        // authentication failed
        return null;
    } else {
        // authentication successful
        return user;
    }
  }

  async getOneUserIdByNamePassword({username, password}): Promise<string | undefined> {
    const user = await this.model.findOne({ name: username }).exec();

    // check account found and verify password
    if (!user || !bcrypt.compareSync(password, user.password)) {
        // authentication failed
        return null;
    } else {
        // authentication successful
        return user._id;
    }
  }

  async updateOneUser(_id, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.model.findByIdAndUpdate(_id, createUserDto, { new: true });
    return user;
  }

  async deleteOneUser(_id): Promise<any> {
    const user = await this.model.findByIdAndRemove(_id);
    return user;
  }
}
