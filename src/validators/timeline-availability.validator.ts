/**
 * * Dependencies
 */
import ms from 'ms';
import { Availability } from 'src/@types';

/**
 * * Validators for timestamp availability
 * ? accepted ranged can be found here https://docs.climacell.co/reference/data-layers-overview#timestep-availability
 */

const defaultErr: Error = new Error(
  'Time format of availability property is wrong',
);

const availabilityValidator = (
  availability: Availability,
  customErr?: Error,
) => {
  try {
    const keys: string[] = Object.keys(availability);

    // ? start
    if (keys.includes('start')) {
      if ((availability.start ?? true) === true) {
        throw new Error();
      }

      // ? ms can accept both string or number -> wrong msg from types
      //@ts-ignore
      if ((ms(availability.start) ?? true) === true) {
        throw new Error();
      }
    }

    // ? end
    if (keys.includes('end')) {
      if ((availability.end ?? true) === true) {
        throw new Error();
      }

      //@ts-ignore
      if ((ms(availability.end) ?? true) === true) {
        throw new Error();
      }
    }
  } catch (err) {
    throw customErr || defaultErr;
  }
};

export { availabilityValidator };
