/**
 * * Test Target
 */
import ClimaCellAPI from '../dist/node';

describe('Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    // *
    it('It should instantiate the object', async () => {
      const instance = new ClimaCellAPI();

      expect(instance).toBeDefined();
    });
  });
});
