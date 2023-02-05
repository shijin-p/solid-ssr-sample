// import path from "path";
import Fastify from 'fastify';
const fastify = Fastify({ logger: false });

import { renderToString } from "solid-js/web";
import App from "../shared/src/components/App";

const port = 8080;

// app.use(express.static(path.join(__dirname, "../public")));

fastify.get("*", function (request, reply) {
  let html;
  try {
    html = renderToString(() => <App url={request.url} />);
  } catch (err) {
    console.error(err);
  } finally {
    reply.send(html);
  }
})

// Run the server!
fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

// app.get("*", (req, res) => {
//   let html;
//   try {
//     html = renderToString(() => <App url={req.url} />);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     res.send(html);
//   }
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
