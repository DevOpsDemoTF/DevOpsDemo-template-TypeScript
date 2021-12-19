import { config } from "./config.ts";
import { log } from "./deps.ts";
import { metricsApplication } from "./metrics.ts";
import { routerApplication } from "./router.ts";
import { State } from "./state.ts";

const conf = await config();
const state = new State(conf);
const mainApp = routerApplication(state);
const metricsApp = metricsApplication();

log.info("Service is running...");

await Promise.any([
  mainApp.listen({ port: 8080, hostname: "0.0.0.0" }),
  metricsApp.listen({ port: 9102, hostname: "0.0.0.0" }),
]);
