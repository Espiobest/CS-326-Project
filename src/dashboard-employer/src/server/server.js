import express from "express";
import logger from "morgan";
import * as db from "./db.js";

const app = express();
const port = 3260;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// The following code handles static file requests for the client-side code.
// You do not need to modify this code. It serves the client-side files from
// the `src/client` directory.

app.use(express.static("src/client"));

const MethodNotAllowedHandler = async (request, response) => {
  response.append('Content-Type', 'text/plain').status(405).send('Method Not Allowed') 
};

app
  .route("/read")
  .get(async (request, response) => {
    const options = request.query;
    readCounter(response, options.name);
  })
  .all(MethodNotAllowedHandler);

// TASK #3: Handle the other request routes

app
  .route("/create")
  .post(async (request, response) => {
    const options = request.query;
    createCounter(response, options.name);
  })

app
  .route("/update")
  .put(async (request, response) => {
    const options = request.query;
    updateCounter(response, options.name);
  })

app
  .route("/delete")
  .delete(async (request, response) => {
    const options = request.query;
    deleteCounter(response, options.name);
  })


app
  .route("/all")
  .get(async (request, response) => {
      dumpCounters(response);
  })

// this should always be the last route
app.route("*").all(async (request, response) => {
  MethodNotAllowedHandler(request, response);
  response.status(404).send(`Not found: ${request.path}`);
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});