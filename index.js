const express = require("express");
const { engine } = require("express-handlebars");
const dotenv = require("dotenv").config();
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");

const connectDB = require("./api/config/bdd");
const router = require("./api/router");

const app = express();
const port = process.env.PORT;
connectDB();

app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
MomentHandler.registerHelpers(Handlebars);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`app lancé sur http://localhost:${port}`);
});
