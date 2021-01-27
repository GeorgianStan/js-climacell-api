import { UnitType } from './enum';

export interface KeyValuePair {
  [key: string]: any;
}

export interface Availability {
  start?: string | number;
  end?: string | number;
}

export interface TimelinesOptions {
  fields: string[];
  availability?: Availability;
  unit?: UnitType;
  timezone?: string;
}
