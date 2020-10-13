import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Usercomm, UsercommDocument } from '../usercomm/usercomm.schema';
import { CommunityDto} from './usercomm.dto';

@Injectable()
export class UsercommService {
  constructor(
    @InjectModel(Usercomm.user_id + Usercomm.comm_id) private readonly model: Model<UsercommDocument>
  ) { }

  async createComm(communityDto: CommunityDto): Promise<Usercomm> {
    const createdUserComm = new this.model(communityDto);
    return createdUserComm.save();
  }

  async getAllUserByCommid(commid): Promise<Usercomm[] | undefined> {
    const users = await this.model.find({ commid }).exec();
    return users;
  }

  async getAllCommunityByUserid(userid): Promise<Usercomm[] | undefined> {
    const comms = await this.model.find({ userid }).exec();
    return comms;
  }

  async deleteOneUserComm({userid, commid}): Promise<any> {
    return await this.model.remove({ userid, commid }).exec();
  }
}