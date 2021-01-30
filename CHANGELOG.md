# Changelog

All notable changes to this module will be documented in this file.

## [v1.0.0](https://github.com/GeorgianStan/js-climacell-api/releases/tag/v1.0.0) (2021-01-30)

### Features

- functionality to create a GET request to `https://data.climacell.co/v4/timelines` with any query parameters
- functionality for instantiating a class with an **API_KEY** and a set of **geographical coordinates**, which will expose a method for each available time step (`current`, `1m`, `5m`, `15m`, `30m`, `1h`, `1d`)
