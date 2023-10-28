"use strict;"

const mysql = require('../../connection/sql.connection').getInstance();


class TodoModal {
    constructor() {
        this.table = "todo";
    }

    createTodo = ({user_id,title,description}) => {
        const query = `INSERT INTO ${this.table} (user_id,title,description) VALUES(${user_id},'${title}','${description}')`;
        return mysql.query(query);
    }
}

module.exports = new TodoModal();