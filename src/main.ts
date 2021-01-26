/**
 * * Types
 */
import { GeoCoordinates } from './@types';
import { QueryBuilderOptions } from './util/@types/interface';

/**
 * * Services
 */
import { UtilService } from './util/util.service';

export class Main {
  /**
   * * Static fields
   */
  static async getWeatherData(fetchMethod: any, options: QueryBuilderOptions) {
    const url = UtilService.queryBuilder(
      'https://data.climacell.co/v4/timelines',
      options,
    );

    const res = await fetchMethod(url);
    return res.json();
  }
  /**
   * * Private fields
   */
  #fetch: any;
  #apiKey: string;
  #coordinates: GeoCoordinates;

  constructor(fetch: any, apiKey: string, coordinates: GeoCoordinates) {
    this.#fetch = fetch;
    this.#apiKey = apiKey;
    this.#coordinates = coordinates;
  }

  /**
   * * Public fields
   */
  async getData() {
    const res = await this.#fetch('https://data.climacell.co/v4/timelines');
    return res.json();
  }
}
