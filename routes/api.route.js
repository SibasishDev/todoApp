const router = require("express").Router();
const authRouter = require("../routes/auth.route").getRouter();

class Router {
  constructor() {
    this.routes = router;
    this.core();
  }

  core() {
    this.routes.use("/", authRouter);
    this.routes.use("*", function (req, res, next) {
      res.json({
        code: 400,
        data: null,
        message: "Not Found.",
        error: null,
      });
    });
  }

  getRouters() {
    return this.routes;
  }
}

module.exports = Router;
