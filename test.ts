import { assertEquals } from "./dev_deps.ts";

Deno.test("hello world #1", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});
