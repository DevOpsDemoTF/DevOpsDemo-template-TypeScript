import { oak } from "./deps.ts";
import { State } from "./state.ts";
import { healthHandler } from "./handlers/health_check.ts";

export function routerApplication(state: State) {
  const app = new oak.Application({
    contextState: "alias",
    state,
  });

  const router = new oak.Router()
    .get("/health", healthHandler);

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
