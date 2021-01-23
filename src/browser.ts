import { Main } from "./main";

export default class ClimaCellAPI extends Main {
  constructor() {
    super(window.fetch.bind(window));
  }
}
