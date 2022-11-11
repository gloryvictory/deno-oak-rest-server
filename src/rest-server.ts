import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {router} from './router.ts'

const port = 5000

function notFound(context: Context) {
  context.response.status = Status.NotFound;
  context.response.body =
    `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
}

const app = new Application()
const controller = new AbortController();


app.use(router.routes())
app.use(router.allowedMethods());

// A basic 404 page
app.use(notFound);

// Response Time
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});


console.log(`App has been started on port ${port}...`)

const { signal } = controller;

await app.listen({ port , signal})

console.log("Finished.");
