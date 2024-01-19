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
      `
        select e.id, e.title, c.title category_title from ${this.table} e 
        inner join categories c on c.id = e.category_id 
        where e.id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `
        select e.id, e.title, c.title category_title from ${this.table} e 
        inner join categories c on c.id = e.category_id`
    );
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

  async update(event) {
    const [rows] = await this.database.query(
      `
        UPDATE  ${this.table}
        SET
          title = ?, 
          category_id = ?
        WHERE id = ?
      `,
      [event.title, event.category, event.eventId]
    );

    return rows;
  }

  async delete(id) {
    //* There are a ON DELETE CASCADE in the tables events_phrases and users_phrases for the foreign keys
    const [rows] = await this.database.query(
      `delete ${this.table}
        from ${this.table}
        where ${this.table}.id = ? `,
      [id]
    );
    return rows;
  }
}

module.exports = EventManager;
