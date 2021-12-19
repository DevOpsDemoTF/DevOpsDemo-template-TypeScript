import { Config } from "./config.ts";

export class State {
  config!: Config;
  private healthy = true;

  constructor(config: Config) {
    this.config = config;
    // TODO: Add db connections, controllers, services, etc that should be passed to handlers
  }

  public ping(): boolean {
    return this.healthy;
  }
}
