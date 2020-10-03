import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';

const dbUrl = 'mongodb+srv://ysha:Woaizhongguo%402020@cluster1.ieadu.mongodb.net/test?retryWrites=true&w=majority';
@Module({
  imports: [
    MongooseModule.forRoot(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    UsersModule],
})

export class AppModule {}