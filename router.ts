import { Application } from "./deps.ts";
import { Config } from "./config.ts";

export function routerApplication(config: Config) {
  const app = new Application();

  app.use((ctx) => {
    ctx.response.body = "Hello World!";
  });

  return app;
}
