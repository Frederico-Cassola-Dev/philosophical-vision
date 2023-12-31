const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "users" as configuration
    super({ table: "philo_currents" });
  }

  // The C of CRUD - Create operation

  async create(philoCurrent) {
    // Execute the SQL INSERT query to add a new philoCurrent to the "users" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title) values (?)`,
      [philoCurrent.title]
    );

    // Return the ID of the newly inserted period
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific period by its ID
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
