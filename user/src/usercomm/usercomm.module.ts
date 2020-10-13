import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsercommService } from './usercomm.service';
import { Usercomm, UsercommSchema } from '../usercomm/usercomm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: Usercomm.user_id + Usercomm.comm_id, schema: UsercommSchema}]),
      { name: Usercomm.user_id + Usercomm.comm_id, schema: UsercommSchema}]),
  ],
  providers: [UsercommService],
  exports: [UsercommService],
})


export class UsercommModule {}
