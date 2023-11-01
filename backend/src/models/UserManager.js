const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, password) values (?, ?, ?, ?)`,
      [user.firstName, user.lastName, user.email, user.hashPassword]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }
}

module.exports = UserManager;
