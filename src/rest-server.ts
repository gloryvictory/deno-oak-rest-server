import { config } from "https://deno.land/std@0.163.0/dotenv/mod.ts";


// Importing some console colors
import {
  bold,
  cyan,
  green,
  yellow,
} from "https://deno.land/std@0.152.0/fmt/colors.ts";

import { Application  } from "https://deno.land/x/oak/mod.ts";
// import { Application, Router, Status, Context } from "https://deno.land/x/oak/mod.ts";

import { router } from './router.ts'
import { notFound    } from "./api/v1/notfound/notfound_controller.ts";


const { AA_PORT } = config()

const port = parseInt(AA_PORT) | 5000



const app = new Application()
const controller = new AbortController();


app.use(router.routes())
app.use(router.allowedMethods());

// A basic 404 page
app.use(notFound);


// Logger
app.use(async (context, next) => {
  await next();
  const rt = context.response.headers.get("X-Response-Time");
  console.log(
    `${green(context.request.method)} ${cyan(context.request.url.pathname)} - ${
      bold(
        String(rt),
      )
    }`,
  );
});


// Response Time
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${ms}ms`);
});


app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold("Start listening on ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold("  using HTTP server: " + yellow(serverType)));
});


console.log(`App has been started on port ${port}...`)

const { signal } = controller;

await app.listen({ port , signal})

console.log(bold("Finished."));
