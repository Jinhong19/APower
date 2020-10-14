import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsercommController } from "./usercomm.controller";
import { UsercommService } from "./usercomm.service";
import { Usercomm, UsercommSchema } from "./usercomm.schema";
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usercomm.name, schema: UsercommSchema}
    ]),
    AuthModule,
  ],
  controllers: [UsercommController],
  providers: [UsercommService],
})

export class UsercommModule {}
