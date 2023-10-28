"use strict;"

const router = require('express').Router();
const TodoController = require('../todo/todo.controller');
const {verifyAccessToken} = require('../../middleware/auth.middleware');


class TodoRouter {
    constructor () {
        this.routes = router;
        this.core();
    }

    core(){
        this.routes.use(verifyAccessToken);
        this.routes.post("/create",TodoController.createTodo);

    }

    getRouters(){
        return this.routes;
    }
}

module.exports = new TodoRouter();