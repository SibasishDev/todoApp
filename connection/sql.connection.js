const mysql = require("mysql2");
const util = require('util');

class mySqlSingleton {
  constructor() {
    this.mySqlpool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      connectionLimit: process.env.DB_POOL_MAX,
      waitForConnections: true,
      queueLimit: 0,
    });
  }

  static getInstance() {
    if (!this.mySqlPool) {
      this.mySqlPool = new mySqlSingleton().mySqlpool;
    }

    // this.mySqlPool.getConnection((err, connection) => {
    //   if (err) {
    //     if (err.code === "PROTOCOL_CONNECTION_LOST") {
    //       console.error("Database connection was closed.");
    //     }
    //     if (err.code === "ER_CON_COUNT_ERROR") {
    //       console.error("Database has too many connections.");
    //     }
    //     if (err.code === "ECONNREFUSED") {
    //       console.error("Database connection was refused.");
    //     }
    //   }
    //   console.log("Database connected successfully");
    //   connection.release();
    //   return connection;
    // });
    this.mySqlPool.query = util.promisify(this.mySqlPool.query);
    return this.mySqlPool;
  }
}
module.exports = mySqlSingleton;
