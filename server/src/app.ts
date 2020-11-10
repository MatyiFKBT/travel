import bodyParser from "body-parser";
import express from "express";
import { routes } from "./controllers";
import { mikroorm } from "./mikroorm";
import ormConfig from '../mikro-orm.config'
const app = express();

app.use(
  bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);

app.use(mikroorm(ormConfig))

app.use(routes);


app.get("/", (req, res) => {
  req.body = {
    "name": "Hello world"
  };
  res.send(req.body);
});

export { app };