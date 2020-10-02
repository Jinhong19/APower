import { HttpService, Injectable } from '@nestjs/common';
import { Weather } from "./weather.interface";

@Injectable()
export class WeatherService {
  constructor(private httpService: HttpService) { }

  async getWeather(): Promise<Weather> {
    const url = 'https://www.metaweather.com/api/location/search/?query=london';
    const response = await this.httpService.get(url).toPromise();
    return response.data[0];
  }
}
