import { oak, prometheus } from "../deps.ts";
import { State } from "../state.ts";

const healthCounter = prometheus.Counter.with({
  name: "health_counter",
  help: "Number of times the health endpoint has been called",
});

export function healthHandler(ctx: oak.Context<State>) {
  let healthy = true;
  let message = "";

  healthCounter.inc();

  try {
    if (!ctx.state.ping()) {
      healthy = false;
    }
  } catch (e) {
    healthy = false;
    message = e.toString();
  }

  if (!healthy) {
    ctx.response.status = 500;
    ctx.response.body = message;
  } else {
    ctx.response.status = 200;
  }
}
