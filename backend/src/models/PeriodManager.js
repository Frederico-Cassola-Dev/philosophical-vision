const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "periods" });
  }

  async create(period) {
    const [result] = await this.database.query(
      `insert into ${this.table} (title) values (?)`,
      [period.title]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the period
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "period" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing period

  // async update(period) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an period by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserManager;
