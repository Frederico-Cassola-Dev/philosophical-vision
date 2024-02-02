const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  async create(category) {
    const [result] = await this.database.query(
      `insert into ${this.table} (title, description) values (?, ?)`,
      [category.title, category.description]
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

  async update(category) {
    const [rows] = await this.database.query(
      `
        UPDATE  ${this.table}
        SET
          title = ?, 
          description = ?
        WHERE id = ?
      `,
      [category.title, category.description, category.categoryId]
    );

    return rows;
  }

  async delete(id) {
    //* There are a ON DELETE CASCADE on the table events_phrases for the foreign keys
    const [rows] = await this.database.query(
      `delete ${this.table}
        from ${this.table}
        where ${this.table}.id = ? `,
      [id]
    );
    return rows;
  }
}

module.exports = CategoryManager;
