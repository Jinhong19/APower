import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";

import { Usercomm, UsercommDocument } from '../usercomm/usercomm.schema';
import { CommunityDto} from './usercomm.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Usercomm.user_id) private readonly model_usercomm: Model<UsercommDocument>
  ) { }

  async createComm(communityDto: CommunityDto): Promise<Usercomm> {
    const createdUserComm = new this.model_usercomm(communityDto);
    return createdUserComm.save();
  }

  async getAllUserByCommid(commid): Promise<Usercomm[] | undefined> {
    const users = await this.model_usercomm.find({ commid }).exec();
    return users;
  }

  async getAllCommunityByUserid(userid): Promise<Usercomm[] | undefined> {
    const comms = await this.model_usercomm.find({ userid }).exec();
    return comms;
  }

  async deleteOneUserComm({userid, commid}): Promise<any> {
    return await this.model_usercomm.remove({ userid, commid }).exec();
  }
}

