import express from "express";
import dotenv from "dotenv";
import { mysqlpool } from "./config/db.js";
import route from "./routes/studentRoutes.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

app.use('/api',route)


app.get("/", function (req, res) {
  res.send(`Hello World ${process.pid}`);
});

mysqlpool
  .query("SELECT 1")
  .then(() => {
    console.log("mysql DB connected !!!");

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
