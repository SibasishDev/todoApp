"use strict;"

const Joi = require('joi');


class TodoValidator {
    createSchema = () => {
      return Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required()
          });
    }
}

module.exports = new TodoValidator();