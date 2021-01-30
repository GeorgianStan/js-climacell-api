/**
 * * Test Target
 */
import ClimaCellAPI from '../src/node';
import { UnitType } from '../src/@types/enum';

const API_KEY = process.env.API_KEY.trim();

if (!API_KEY) {
  throw Error('Please provice API_KEY as env variable');
}

describe('Node Library Integration Test', () => {
  const homeTownMonitor: ClimaCellAPI = new ClimaCellAPI(API_KEY, [
    '45.6427',
    '25.5887',
  ]);

  it('static method should be able to retrieve the data', async () => {
    const res = await ClimaCellAPI.requestData({
      location: '45.6427,25.5887',
      apikey: API_KEY,
      fields: ['temperature'],
    });

    expect(res.data).toBeDefined();
  });

  it('Instance should be able to retrieve the data', async () => {
    const res_1 = await homeTownMonitor.current({ fields: ['temperature'] });
    const res_2 = await homeTownMonitor.perMinute({
      fields: ['temperature'],
      availability: { start: '-2h', end: 1000 * 60 * 60 * 2 },
      units: UnitType.imperial,
      timezone: 'Europe/Bucharest',
    });

    expect(res_1.data).toBeDefined();
    expect(res_2.data).toBeDefined();
  });

  it('Should throw error if availability format is wrong', async () => {
    await expect(
      homeTownMonitor.perMinute({
        fields: ['temperature'],
        availability: { start: '{' },
      }),
    ).rejects.toThrow('Time format of availability property is wrong');
  });
});
