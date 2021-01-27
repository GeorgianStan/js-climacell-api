/**
 * * Classes
 */
import { Main } from './main';

/**
 * * Types
 */
import { GeoCoordinates } from './@types';
import { QueryBuilderOptions } from './util/@types/interface';

export default class ClimaCellAPI extends Main {
  /**
   * * Static fields
   */
  static async requestData(options: QueryBuilderOptions) {
    return super.requestData(window.fetch.bind(window), options);
  }

  constructor(apiKey: string, coordinates: GeoCoordinates) {
    super(window.fetch.bind(window), apiKey, coordinates);
  }
}
