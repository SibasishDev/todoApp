"use strict;"

const todoValidator = require('./todo.validator');
const todoModal = require('./todo.modal');


class TodoController {
    constructor () {

    }

    createTodo = async (req,res,next) => {
        try{
            const {title ,description} = await todoValidator.createSchema().validateAsync(req.body);

            const insertTodo = await todoModal.createTodo({user_id : req.user.id,title,description});

            if(!insertTodo.affectedRows) return next({code : 400, message : "some error in inserting todo data"})

            return res.status(200).json({
                code : 201,
                message : "Todo created successfully"
            })

        }catch(e){
            next(e);
        }
    }
}

module.exports = new TodoController();