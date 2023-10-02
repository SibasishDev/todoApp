const authRouter = require('express').Router();
const authController = require('../controller/auth/auth.controller');

class authRoute {
    constructor() {
        this.routes = authRouter;
        this.core();
    }

    core () {
        this.routes.post('/login',authController.login);
        this.routes.post('/register',authController.register);
    }

    getRouter(){
        return this.routes;
    }
}



module.exports = new authRoute();