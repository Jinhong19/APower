import { Controller, Get } from '@nestjs/common';
import { Weather } from './weather.interface';
import { WeatherService } from "./weather.service";

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  @Get()
  async getWeather(): Promise<Weather> {
    return await this.weatherService.getWeather();
  }
}
