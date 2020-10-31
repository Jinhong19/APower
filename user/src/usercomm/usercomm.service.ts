import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Usercomm, UsercommDocument } from "./usercomm.schema";
import { CreateUsercommDto } from "./usercomm.dto";

@Injectable()
export class UsercommService {
  constructor(
    @InjectModel(Usercomm.name) private model: Model<UsercommDocument>
  ) { }

  async create(dto: CreateUsercommDto): Promise<Usercomm> {
    const cu = new this.model(dto);
    return cu.save();
  }

  async getOne(comm_id, user_id: string): Promise<Usercomm | undefined> {
    const obj = await this.model.findOne({ comm_id, user_id }).exec();
    return obj;
  }

  async getId(comm_id, user_id: string): Promise<String | undefined> {
    const obj = await this.model.findOne({ comm_id, user_id }).exec();
    return obj._id;
  }

  async getCommsByUserId(user_id: string): Promise<Usercomm[]> {
    return await this.model.find({ user_id }).exec();
  }

  async getUsersByCommId(comm_id: string): Promise<Usercomm[]> {
    return await this.model.find({ comm_id }).exec();
  }

  async update(_id: string, dto: CreateUsercommDto): Promise<Usercomm | undefined> {
    return await this.model.findByIdAndUpdate(_id, dto, { new: true });
  }

  async delete(comm_id, user_id: string): Promise<Usercomm | undefined> {
    console.log(comm_id, user_id);
    return await this.model.findOneAndDelete({ comm_id, user_id });
  }
}