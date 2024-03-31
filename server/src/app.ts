import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
import { connectDb } from "./db/index";
import routes from "./routers/index";

//const dotenv = require("dotenv");
//dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

const PORT = 3001;

connectDb().then(async () => {
  app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
