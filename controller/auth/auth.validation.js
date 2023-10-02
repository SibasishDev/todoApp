"use strict";

const Joi = require("joi");

class loginValidator {
  loginSchema() {
    return Joi.object().keys({
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(3).required(),
    });
  }

  registerSchema() {
    return Joi.object().keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(3).required(),
      confirm_password: Joi.string().required().valid(Joi.ref('password'))
    });
  }
}

module.exports = new loginValidator();
