"use strict";

const mysql = require("../../connection/sql.connection").getInstance();

class authModal {
  constructor() {
    this.userTable = "users";
    this.todo = "todo";
  }

  getUserByEmail({email}) {
    const query = `select id,email,first_name,last_name,password from ${this.userTable} where email = '${email}'`;
    return mysql.query(query);
  }

  registerUser({ email, firstName, lastName, password }) {
    const query = `INSERT into users (email,first_name,last_name,password)
        VALUES('${email}','${firstName}','${lastName}','${password}')
        `;
        return mysql.query(query);
  }
}

module.exports = new authModal();
