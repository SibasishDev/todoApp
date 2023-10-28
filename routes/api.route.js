const router = require("express").Router();
const authRouter = require("../routes/auth.route").getRouters();
const todoRouter = require("../controller/todo/todo.route").getRouters();

class Router {
  constructor() {
    this.routes = router;
    this.core();
  }

  core() {
    this.routes.use("/", authRouter);
    this.routes.use("/todo", todoRouter);
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
