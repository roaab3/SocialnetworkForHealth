
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
import { connectDb } from "./db/index";
import routes from "./routers/index";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);





const PORT = 3001;

connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});

