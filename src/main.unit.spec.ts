/**
 * * Test Target
 */
import { Main } from './main';

/**
 * * Mock fetch
 */
jest.mock('node-fetch');

import fetch from 'node-fetch';

describe('Unit Tests', () => {
  const API_KEY = 'myKEy12';
  const LAT = '12';
  const LON = '11';

  const ONE_HOUR_IN_MS = 3.6e6;
  const NOW: number = Date.now();

  const instance = new Main(require('node-fetch'), API_KEY, [LAT, LON]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    //@ts-ignore
    fetch.mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve({}),
      }),
    );
  });

  describe('constructor', () => {
    // *
    it('It should instantiate the object', async () => {
      const instance = new Main(require('node-fetch'), '', ['', '']);

      expect(instance).toBeDefined();
    });
  });

  describe('static getWeatherData()', () => {
    it('Should make a request to the correct URL', async () => {
      await Main.requestData(require('node-fetch'), {
        apikey: '23',
        location: `1.2%2C2.2`,
        fields: ['temperature', 'humidity'],
      });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://data.climacell.co/v4/timelines?apikey=23&location=1.2%2C2.2&fields=temperature&fields=humidity',
      );
    });
  });

  describe('Complex data format', () => {
    it('Should make a request to the correct URL when star,end and timezones are provided', async () => {
      const timezone = 'Africa/Abidjan';
      jest.spyOn(Date, 'now').mockImplementation(() => NOW);

      await instance.current({ fields: ['temperature'] });
      await instance.current({
        fields: ['temperature'],
        availability: { start: '-1h', end: '1h' },
      });
      await instance.current({
        fields: ['temperature'],
        availability: { start: '-1h', end: '2h' },
        timezone,
      });

      expect(fetch).toHaveBeenCalledTimes(3);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'https://data.climacell.co/v4/timelines?timesteps=current&fields=temperature&apikey=myKEy12&location=12,11',
      );

      expect(fetch).toHaveBeenNthCalledWith(
        2,
        `https://data.climacell.co/v4/timelines?timesteps=current&fields=temperature&startTime=${new Date(
          NOW - ONE_HOUR_IN_MS,
        ).toISOString()}&endTime=${new Date(
          NOW + ONE_HOUR_IN_MS,
        ).toISOString()}&apikey=myKEy12&location=12,11`,
      );

      const timezoneStart: number = new Date(
        new Date(Date.now()).toLocaleString('en-US', {
          timeZone: timezone,
        }),
      ).getTime();

      expect(fetch).toHaveBeenNthCalledWith(
        3,
        `https://data.climacell.co/v4/timelines?timesteps=current&fields=temperature&startTime=${new Date(
          timezoneStart - ONE_HOUR_IN_MS,
        ).toISOString()}&endTime=${new Date(
          timezoneStart + ONE_HOUR_IN_MS * 2,
        ).toISOString()}&apikey=myKEy12&location=12,11&timezone=Africa/Abidjan`,
      );
    });
  });

  describe('Availability as a number', () => {
    it('If availability is not a string, but a number then it should be treated as a timestamp', async () => {
      jest.spyOn(Date, 'now').mockImplementation(() => NOW);

      await instance.perMinute({
        fields: ['temperature'],
        availability: { start: -1000 * 60 },
      });

      expect(fetch).toHaveBeenCalledWith(
        `https://data.climacell.co/v4/timelines?timesteps=1m&fields=temperature&startTime=${new Date(
          NOW - 1000 * 60,
        ).toISOString()}&apikey=myKEy12&location=12,11`,
      );
    });

    it('If availability is a number as a string, then it should be treated as a timestamp', async () => {
      jest.spyOn(Date, 'now').mockImplementation(() => NOW);

      await instance.perMinute({
        fields: ['temperature'],
        availability: { start: String(-1000 * 60) },
      });

      expect(fetch).toHaveBeenCalledWith(
        `https://data.climacell.co/v4/timelines?timesteps=1m&fields=temperature&startTime=${new Date(
          NOW - 1000 * 60,
        ).toISOString()}&apikey=myKEy12&location=12,11`,
      );
    });
  });

  describe('current()', () => {
    it('Should make a request to the correct URL', async () => {
      await instance.current({ fields: ['temperature'] });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'https://data.climacell.co/v4/timelines?timesteps=current&fields=temperature&apikey=myKEy12&location=12,11',
      );
    });
  });

  describe('perMinute()', () => {
    it('Should make a request to the correct URL', async () => {
      await instance.perMinute({ fields: ['temperature'] });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'https://data.climacell.co/v4/timelines?timesteps=1m&fields=temperature&apikey=myKEy12&location=12,11',
      );
    });
  });

  describe('per5Minutes()', () => {
    it('Should make a request to the correct URL', async () => {
      await instance.per5Minutes({ fields: ['temperature'] });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'https://data.climacell.co/v4/timelines?timesteps=5m&fields=temperature&apikey=myKEy12&location=12,11',
      );
    });
  });

  describe('per15Minutes()', () => {
    it('Should make a request to the correct URL', async () => {
      await instance.per15Minutes({ fields: ['temperature'] });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'https://data.climacell.co/v4/timelines?timesteps=15m&fields=temperature&apikey=myKEy12&location=12,11',
      );
    });
  });

  describe('per30Minutes()', () => {
    it('Should make a request to the correct URL', async () => {
      await instance.per30Minutes({ fields: ['temperature'] });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'https://data.climacell.co/v4/timelines?timesteps=30m&fields=temperature&apikey=myKEy12&location=12,11',
      );
    });
  });

  describe('perHour()', () => {
    it('Should make a request to the correct URL', async () => {
      await instance.perHour({ fields: ['temperature'] });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'https://data.climacell.co/v4/timelines?timesteps=1h&fields=temperature&apikey=myKEy12&location=12,11',
      );
    });
  });

  describe('perDay()', () => {
    it('Should make a request to the correct URL', async () => {
      await instance.perDay({ fields: ['temperature'] });

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        'https://data.climacell.co/v4/timelines?timesteps=1d&fields=temperature&apikey=myKEy12&location=12,11',
      );
    });
  });
});
