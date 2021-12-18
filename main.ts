import { config } from "./config.ts";
import { log } from "./deps.ts";
import { metricsApplication } from "./metrics.ts";
import { routerApplication } from "./router.ts";

const conf = await config();
const mainApp = routerApplication(conf);
const metricsApp = metricsApplication();

log.info("Service is running...");

await Promise.any([
  mainApp.listen({ port: 8080, hostname: "0.0.0.0" }),
  metricsApp.listen({ port: 9102, hostname: "0.0.0.0" }),
]);
