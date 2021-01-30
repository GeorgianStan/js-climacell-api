# js-climacell-api

<div style='text-align:center'>
    <img src='https://img.shields.io/github/issues/GeorgianStan/js-climacell-api' alt='issues'>
    <img src='https://img.shields.io/github/forks/GeorgianStan/js-climacell-api' alt='forks'>
    <img src='https://img.shields.io/github/stars/GeorgianStan/js-climacell-api' alt='stars'>
    <img src='https://img.shields.io/github/license/GeorgianStan/js-climacell-api' alt='license'>
    <img src='https://img.shields.io/github/package-json/v/GeorgianStan/js-climacell-api?color=%237146f9&logo=javascript' alt='version'>
</div>

`js-climacell-api` is a JavaScript wrapper around the [ClimaCell API](https://docs.climacell.co/reference/api-overview) (v4)
that can be used in both NodeJS and Browser environments

## Installation

_This package is Typescript ready_

```bash
npm i js-climacell-api
```

## How to use it

The library is a default export.

### Browser

To use it browser, you need to use the code from `browser.js` file.

```html
<script src="path-to-local-library/browser.js"></script>
```

or via CDN

```html
<script src="https://unpkg.com/js-climacell-api@X.Y.Z/browser.js"></script>
```

Where `X.Y.Z` represents the library version.

In this scenario, the library will be bound to the global window object with the property ClimaCellAPI.

`window.ClimaCellAPI` or simple `ClimaCellAPI` can be used to access the library.

If you have a toolchain available you can use an `import` statement.

```ts
import ClimaCellAPI from 'js-climacell-api/browser';
```

```js
const ClimaCellWrapper = require('js-climacell-api/browser');
```

_Because is a default export, here you can import it with what name you want_

---

### Node

For `NodeJS` environment, just replace `browser` with `node`

```ts
import ClimaCellAPI from 'js-climacell-api/node';
```

## Methods

The object imported is a class that will expose the following methods:

```ts
static async requestData(options: QueryBuilderOptions):Promise<any> {}
```

Where `options` is an object of form:

```ts
interface QueryBuilderOptions {
  [param: string]: string | number | string[] | number[];
}
```

This static method can be used to compute an URL and send a GET request to `https://data.climacell.co/v4/timelines`.

The values from `options` object will be transformed into query parameters.

_Example_

```ts
await ClimaCellAPI.requestData({
  apikey: '23',
  location: `1.2%2C2.2`,
  fields: ['temperature', 'humidity'],
});
```

will result in a request to the following URL:

```
https://data.climacell.co/v4/timelines?apikey=23&location=1.2%2C2.2&fields=temperature&fields=humidity
```

The result will be exactly the **raw** response from the API.

The purpose of this method is to give you full controll over the request URL and help you easily compute it and acquire [timeline data](https://docs.climacell.co/reference/retrieve-timelines-basic) from the API.

**Don't forget to add your `apikey`!**

---

**For the following methods the class must be instantiated with the following constructor.**

```ts
constructor(apiKey: string, coordinates: GeoCoordinates) {}
```

Where `coordinates` has the following format:

```ts
export type GeoCoordinates = [string | number, string | number]; //latitude & longitude
```

**Example**

```ts
import ClimaCellApi from 'js-climacell-api/dist/node';

const API_KEY = '';
const LAT = '';
const LON = '';

const hometownMonitor = new ClimaCellApi(API_KEY, [LAT, LON]);
```

The available methods are the following:

```ts
async current(options: TimelinesOptions): Promise<any> {}
async perMinute(options: TimelinesOptions): Promise<any> {}
async per5Minutes(options: TimelinesOptions): Promise<any> {}
async per15Minutes(options: TimelinesOptions): Promise<any> {}
async per30Minutes(options: TimelinesOptions): Promise<any> {}
async perDay(options: TimelinesOptions): Promise<any> {}
```

Each method will return the **raw** response from the API.

The types:

```ts
export enum UnitType {
  metric = 'metric', // International System of Units
  imperial = 'imperial', // Imperial and US customary measurement systems
}

export interface Availability {
  start?: string | number;
  end?: string | number;
}

export interface TimelinesOptions {
  fields: string[];
  availability?: Availability;
  units?: UnitType;
  timezone?: string;
}
```

`availability?: Availability` matches the availability mentioned in the [documentation ](https://docs.climacell.co/reference/data-layers-overview#timestep-availability) and represents the interval of the data requested

`timezone?: string` - Timezone names follow the [IANA Time Zone Database format](https://docs.climacell.co/reference/api-formats#timezone)

`fields` represents an array with the fields you are intersted in ([Core-Air Quality-Pollen-Fire-Precipitation](https://docs.climacell.co/reference/data-layers-overview))

## Examples

```js
(async () => {
  const hometownMonitor = new ClimaCellAPI('api_key', [45.6427, 25.5887]);

  await hometownMonitor.perMinute({
    fields: ['temperature', 'particulateMatter25'],
    units: 'imperial',
  });
})();
```

Will result in a request to the following URL.

```
https://data.climacell.co/v4/timelines?timesteps=1m&fields=temperature&fields=particulateMatter25&units=imperial&apikey=api_key&location=45.6427,25.5887
```

---

**availability**

```js
await hometownMonitor.perMinute({
  fields: ['humidity'],
  availability: {
    start: '-1h',
    end: '2h',
  },
});
```

The above call will request data with a time interval of 1m, but starting with 1 hour behind the current time and up to 2 hours in front.

The accepted values for `availability.start` and `availability.end` are
the time formats accepted by [ms](https://www.npmjs.com/package/ms) module.

The next call will request data starting 5 minutes in the future from the current time.

```js
await hometownMonitor.perMinute({
  fields: ['humidity'],
  availability: {
    start: 1000 * 60 * 5,
  },
});
```

If you want to use an exact date, then you can implement it as in the following example:

```ts
const specificDate = '2021-01-30T12:07:01.939Z';

await hometownMonitor.perMinute({
  fields: ['humidity'],
  availability: {
    start: new Date(specificDate).getTime() - Date.now(),
  },
});
```
