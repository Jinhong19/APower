import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WeatherModule } from './future/weather.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ysha:Woaizhongguo%402020@cluster1.ieadu.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    WeatherModule,
    UsersModule],
})
export class AppModule {}
