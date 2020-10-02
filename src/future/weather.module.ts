import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
  controllers: [WeatherController]
})
export class WeatherModule {}
