const AbstractManager = require("./AbstractManager");

class PhraseManager extends AbstractManager {
  constructor() {
    super({ table: "phrases" });
  }

  async create(phrase) {
    const [result] = await this.database.query(
      `insert into ${this.table} (title) values (?)`,
      [phrase.title]
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

  async read5() {
    const [rows] = await this.database.query(
      `select * from ${this.table} order by rand() limit 5`
    );

    return rows;
  }

  async read4ByEventId(id) {
    const [rows] = await this.database.query(
      `SELECT p.id, p.phrase, p.likes, p.dislikes, p.is_favorite, ep.events_id, e.title event_title FROM ${this.table} p
    inner join philosophical_vision.events_phrases ep on ep.phrases_id = p.id
    inner join philosophical_vision.events e on e.id = ep.events_id
    where e.id = ?
    order by rand()
    limit 4`,
      [id]
    );

    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing phrase

  // async update(phrase) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an phrase by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = PhraseManager;
