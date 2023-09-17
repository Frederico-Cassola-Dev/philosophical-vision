const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "events_phrases" });
  }

  async create(eventPhrase) {
    // console.log("🚀 - eventPhrase:", eventPhrase)

    const [result] = await this.database.query(
      `insert into ${this.table} (events_id, phrases_id) values (?,?)`,
      [eventPhrase.eventId, eventPhrase.phraseId]
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
