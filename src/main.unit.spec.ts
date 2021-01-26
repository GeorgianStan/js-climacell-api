/**
 * * Test Target
 */
import ClimaCellAPI from './node';

jest.mock('node-fetch');

import fetch from 'node-fetch';

describe('Unit Tests', () => {
  afterAll(() => {
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
      const instance = new ClimaCellAPI('', ['', '']);

      expect(instance).toBeDefined();
    });
  });

  describe('static getWeatherData()', () => {
    it('Should make a request to the correct URL', async () => {
      await ClimaCellAPI.getWeatherData({
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
});
