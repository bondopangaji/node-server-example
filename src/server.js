// Copyright (c) 2022 Bondo Pangaji
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const http = require("http");

/**
 * Request handler listener
 *
 * @param request
 * @param response
 */
const requestListener = (request, response) => {
  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "This is Home page",
        })
      );
    } else {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Page cannot be accessed with ${method} request`,
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "This is About page",
        })
      );
    } else if (method === "POST") {
      response.setHeader("Content-Type", "application/json");

      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(
          JSON.stringify({
            message: `Hello, ${name}! This is About page`,
          })
        );
      });
    } else {
      response.setHeader("Content-Type", "application/json");
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Page cannot be accessed with ${method} request`,
        })
      );
    }
  } else {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: "Page cannot be found!",
      })
    );
  }
};

const server = http.createServer(requestListener);

const host = "localhost";
const port = 5000;

server.listen(port, host, () => {
  console.log(`Server runs on http://${host}:${port}`);
});
