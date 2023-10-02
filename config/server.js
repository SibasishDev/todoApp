"use strict;";
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require('compression');
const helmet = require("helmet");
const Routes = require("../routes/api.route");

 class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
  }

  core() {
    this.setMiddleware(this.app);
    this.listenToPort(this.app, this.port);
    this.mysqlConnection();
  }

  setMiddleware(app) {
    app.use(helmet());

    app.use(morgan("dev"));

    app.use(cors());


    app.use(
      express.json({
        limit: "50mb",
        type: "application/json",
      }),express.urlencoded({
        limit: '50mb',
        urlencoded: false,
        extended: true
      }));

    app.use(compression());

    app.use(express.static("public"));
   
    app.use("/api", new Routes().getRouters());
    app.use(require('../middleware/error.handler'));

  }

  mysqlConnection() {
    // require("../connection/sql.connection");
  }

  listenToPort(app, port) {
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  }
}

module.exports = new App();
