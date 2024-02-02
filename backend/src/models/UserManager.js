const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (first_name, last_name, email, password) values (?, ?, ?, ?)`,
      [user.firstName, user.lastName, user.email, user.hashPassword]
    );

    const [resultWithRole] = await this.database.query(
      `insert into users_roles (user_id) values (?)`,
      [result.insertId]
    );

    return {
      userInsertedId: result.insertId,
      userRoleInsertedId: resultWithRole.insertId,
    };
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select u.id, u.first_name, u.last_name, u.email, u.password, r.role_name from ${this.table} u
      INNER JOIN users_roles ur on ur.user_id = u.id
      INNER JOIN roles r on r.id = ur.role_id 
      where u.id = ?`,
      [id]
    );

    return rows[0];
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `SELECT u.id, u.first_name, u.last_name, users_roles.role_id, u.email, u.password FROM ${this.table} u
        INNER JOIN users_roles ON users_roles.user_id = u.id
        INNER JOIN roles ON roles.id = users_roles.role_id       
      where u.email = ?`,
      [email]
    );

    return rows[0];
  }

  async readByResetToken(token) {
    // console.log("🚀 - token:", token)

    const [rows] = await this.database.query(
      `SELECT * FROM users WHERE reset_token = ?`,
      [token]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select u.id, u.first_name, u.last_name, u.email, r.role_name from ${this.table} u
      INNER JOIN users_roles ur on ur.user_id = u.id
      INNER JOIN roles r on r.id = ur.role_id`
    );

    return rows;
  }

  async update(user) {
    if (user.hashPassword) {
      const [rows] = await this.database.query(
        `
        UPDATE  ${this.table}
        SET
        first_name = ?, 
        last_name = ?,
        email = ?,
        password = ?
        WHERE id = ?
        `,
        [
          user.newFirstName,
          user.newLastName,
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
            first_name = ?, 
            last_name = ?,
            email = ?
          WHERE id = ?
  `,
      [
        user.newFirstName || "",
        user.newLastName || "",
        user.newEmail,
        user.userId,
      ]
    );
    return rows;
  }

  async updateResetToken(user) {
    const [rows] = await this.database.query(
      `
        UPDATE  ${this.table}
        SET
          reset_token = ?, 
          reset_token_expires_at = ?
        WHERE id = ?
      `,
      [user.resetToken, user.expirationTime, user.userId]
    );

    return rows;
  }

  async updateAfterCreateResetToken(user) {
    const [rows] = await this.database.query(
      `
        UPDATE  ${this.table}
        SET
          password = ?,
          reset_token = null, 
          reset_token_expires_at = null
        WHERE id = ?
      `,
      [user.hashPassword, user.userId]
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
