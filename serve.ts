#!/usr/bin/env -S deno run --allow-net --allow-read --watch
import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import router from './router.ts'

const app = new Application();

app.use((ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*')
  return next()
})
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 });