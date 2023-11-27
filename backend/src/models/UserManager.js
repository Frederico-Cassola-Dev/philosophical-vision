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

  async update(user) {
    if (user.hashPassword) {
      const [rows] = await this.database.query(
        `
    UPDATE  ${this.table}
    SET
      firstname = ?, 
      lastname = ?,
      email = ?,
      password = ?
    WHERE id = ?
    `,
        [
          user.newLastName,
          user.newFirstName,
          user.newEmail,
          user.hashPassword,
          user.userId,
        ]
      );
      return rows;
    }
    const [rows] = await this.database.query(
      `
  UPDATE  ${this.table}
  SET
    firstname = ?, 
    lastname = ?,
    email = ?
  WHERE id = ?
  `,
      [user.newLastName, user.newFirstName, user.newEmail, user.userId]
    );
    return rows;
  }

  async delete(id) {
    //* There are a ON DELETE CASCADE in the table users_phrases for the foreign keys
    const [rows] = await this.database.query(
      `delete ${this.table}
        from ${this.table}
        where ${this.table}.id = ? `,
      [id]
    );
    return rows;
  }
}

module.exports = UserManager;
