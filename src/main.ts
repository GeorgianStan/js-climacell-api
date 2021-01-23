export class Main {
  #fetch: any;

  constructor(fetch: any) {
    this.#fetch = fetch;
  }

  async getData() {
    const res = await this.#fetch('https://data.climacell.co/v4/timelines');
    return res.json();
  }
}
