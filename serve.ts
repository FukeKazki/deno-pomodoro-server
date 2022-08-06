#!/usr/bin/env -S deno run --allow-net --allow-read --watch
import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });