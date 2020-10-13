import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema';
import { Usercomm, UsercommSchema} from './../usercomm/usercomm.schema';
import { UsercommService } from '../usercomm/usercomm.service';
import { UsercommModule } from '../usercomm/usercomm.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema},
      // { name: Usercomm.user_id + Usercomm.comm_id , schema: UsercommSchema},
    ]),
    AuthModule,
    // UsercommModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule {}
