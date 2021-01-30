/**
 * * Test Target
 */
import { UtilService } from './util.service';

describe('UtilService - Unit Tests', () => {
  describe('queryBuilder()', () => {
    const testURL = 'https://blank.org';
    // *
    it('It should correctly compute the URL based on some query parameters sent as an object', async () => {
      const url_1 = UtilService.queryBuilder(testURL, {
        p: 'p',
        p2: 'p2',
        arr: [1, 2, 3],
      });

      const url_2 = UtilService.queryBuilder(testURL + '?', {
        p: 'p',
      });

      const url_3 = UtilService.queryBuilder(testURL + '?p=p', {
        p2: 'p2',
      });

      const url_4 = UtilService.queryBuilder(testURL + '?p=p&', {
        p3: 'p3',
      });

      let expected_1 = 'https://blank.org?p=p&p2=p2&arr=1&arr=2&arr=3';
      let expected_2 = 'https://blank.org?p=p';
      let expected_3 = 'https://blank.org?p=p&p2=p2';
      let expected_4 = 'https://blank.org?p=p&p3=p3';

      expect(url_1).toBe(expected_1);
      expect(url_2).toBe(expected_2);
      expect(url_3).toBe(expected_3);
      expect(url_4).toBe(expected_4);
    });
  });
});
