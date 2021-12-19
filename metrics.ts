import { oak, prometheus } from "./deps.ts";

export function metricsApplication() {
  const app = new oak.Application();

  app.use((ctx) => {
    if (ctx.request.url.pathname === "/metrics") {
      ctx.response.headers.set("Content-Type", "");
      ctx.response.body = prometheus.Registry.default.metrics();
    }
  });

  return app;
}
