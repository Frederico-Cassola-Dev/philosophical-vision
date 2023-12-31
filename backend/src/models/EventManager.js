const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "events" });
  }

  async create(event) {
    const [result] = await this.database.query(
      `insert into ${this.table} (title, category_id) values (?,?)`,
      [event.title, event.categoryId]
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

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async readAllByTitle(title) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where title like ?`,
      [`%${title}%`]
    );
    return rows;
  }

  async readAllByCategoryId(id) {
    const [rows] = await this.database.query(
      `SELECT e.id, e.title, e.category_id FROM ${this.table} e
    inner join philosophical_vision.categories c ON c.id = e.category_id
    where c.id = ?`,
      [id]
    );
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing event

  // async update(event) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an event by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = EventManager;
