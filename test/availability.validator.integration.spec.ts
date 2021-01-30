/**
 * * Test Target
 */
import { availabilityValidator } from '../src/validators/timeline-availability.validator';

describe('Availability Validators Integration Tests', () => {
  describe('perMinuteAvailability()', () => {
    // *
    it('Should throw a custom error if provided', () => {
      const customErr = new Error('Custom');
      expect(() =>
        availabilityValidator({ start: '' }, customErr),
      ).toThrowError(customErr);
    });

    it('Should throw if is start or end has a wrong data type', () => {
      //@ts-ignore
      expect(() => availabilityValidator({ end: {} })).toThrow();
      //@ts-ignore
      expect(() => availabilityValidator({ start: [] })).toThrow();

      //@ts-ignore
      expect(() => availabilityValidator({ start: false })).toThrow();

      //@ts-ignore
      expect(() => availabilityValidator({ start: true })).toThrow();
    });

    it('Should throw if is start or end has a wrong format and it returns null or undefined', () => {
      //@ts-ignore
      expect(() => availabilityValidator({ end: '2hh' })).toThrow();
    });

    // *
    it('Should not throw if start or end is missing', () => {
      expect(() => availabilityValidator({})).not.toThrow();
      expect(() => availabilityValidator({ start: '2h' })).not.toThrow();
      expect(() => availabilityValidator({ end: '2h' })).not.toThrow();
    });

    // *
    it('Should not throw if start or end is a number', () => {
      expect(() => availabilityValidator({ start: 5 })).not.toThrow();
      expect(() => availabilityValidator({ end: 23 })).not.toThrow();
    });
  });
});
