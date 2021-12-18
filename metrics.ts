import { Application, prometheus } from "./deps.ts";

export function metricsApplication() {
  const app = new Application();

  app.use((ctx) => {
    ctx.response.headers.set("Content-Type", "");
    ctx.response.body = prometheus.Registry.default.metrics();
  });

  return app;
}
