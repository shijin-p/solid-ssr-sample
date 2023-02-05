import path from "path";
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors'

const fastify = Fastify({
  // IF app is not running, make logger: true to view error logs and resolve them
  logger: false
});

import { renderToString } from "solid-js/web";
import App from "../shared/src/components/App";

const port = 8080;

fastify.register(cors).register(fastifyStatic, { root: path.join(__dirname, '../public') })

// routes
fastify.get("/", route);
fastify.get("/profile", route);
fastify.get("/settings", route);

function route(request, reply) {
  let html;
  try {
    html = renderToString(() => <App url={request.url} />);
  } catch (err) {
    console.error(err);
  } finally {
    reply.type('text/html')
    reply.send(html);
  }
}

// Run the server!
fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
