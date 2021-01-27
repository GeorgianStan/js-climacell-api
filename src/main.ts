/**
 * * Dependencies
 */
import ms from 'ms';

/**
 * * Types
 */
import { Availability, GeoCoordinates, TimelinesOptions } from './@types';
import { TimeStepValues, UnitType } from './@types/enum';
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
  #baseURL: string = 'https://data.climacell.co/v4/timelines';

  #fetch: any;
  #apiKey: string;
  #coordinates: GeoCoordinates;

  constructor(fetch: any, apiKey: string, coordinates: GeoCoordinates) {
    this.#fetch = fetch;
    this.#apiKey = apiKey;
    this.#coordinates = coordinates;
  }

  /**
   * * getData()
   * ? general method to be used in order to retrieve data
   * @param fields - field to get data for
   * @param timestep - current,1m,5m,15m,30m,1h,1d
   * @param unit - SI or American Custom Units
   * @param availability - time interval
   */
  #getData = async (
    timestep: TimeStepValues,
    options: TimelinesOptions,
  ): Promise<any> => {
    const {
      fields,
      availability,
      unit,
      timezone,
    }: {
      fields?: string[];
      availability?: Availability;
      unit?: UnitType;
      timezone?: string;
    } = options;

    const now: number = timezone
      ? new Date(
          new Date(Date.now()).toLocaleString('en-US', {
            timeZone: timezone,
          }),
        ).getTime()
      : Date.now();

    const startTime: string =
      availability?.start &&
      new Date(now + ms(availability.start)).toISOString();

    const endTime: string =
      availability?.end && new Date(now + ms(availability.end)).toISOString();

    const url = UtilService.queryBuilder(this.#baseURL, {
      timestep,
      fields,
      unit,
      startTime,
      endTime,
      apikey: this.#apiKey,
      location: this.#coordinates.join(','),
      timezone,
    });

    const res = await this.#fetch(url);
    return res.json();
  };

  /**
   * * Public fields
   */

  /**
   * * current()
   * ? get data with a timestamp of current
   */
  async current(options: TimelinesOptions): Promise<any> {
    return this.#getData(TimeStepValues['current'], options);
  }

  /**
   * * perMinute()
   * ? get data with a timestamp of 1m
   */
  async perMinute(options: TimelinesOptions): Promise<any> {
    return this.#getData(TimeStepValues['1m'], options);
  }

  /**
   * * per5Minutes()
   * ? get data with a timestamp of 5m
   */
  async per5Minutes(options: TimelinesOptions): Promise<any> {
    return this.#getData(TimeStepValues['5m'], options);
  }

  /**
   * * per15Minutes()
   * ? get data with a timestamp of 15m
   */
  async per15Minutes(options: TimelinesOptions): Promise<any> {
    return this.#getData(TimeStepValues['15m'], options);
  }

  /**
   * * per30Minutes()
   * ? get data with a timestamp of 30m
   */
  async per30Minutes(options: TimelinesOptions): Promise<any> {
    return this.#getData(TimeStepValues['30m'], options);
  }

  /**
   * * perHour()
   * ? get data with a timestamp of 1h
   */
  async perHour(options: TimelinesOptions): Promise<any> {
    return this.#getData(TimeStepValues['1h'], options);
  }

  /**
   * * perDay()
   * ? get data with a timestamp of 1d
   */
  async perDay(options: TimelinesOptions): Promise<any> {
    return this.#getData(TimeStepValues['1d'], options);
  }
}
