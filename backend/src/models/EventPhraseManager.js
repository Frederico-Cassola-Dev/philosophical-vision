const AbstractManager = require("./AbstractManager");

class EventManager extends AbstractManager {
  constructor() {
    super({ table: "events_phrases" });
  }

  async create(eventPhrase) {
    const [result] = await this.database.query(
      `insert into ${this.table} (event_id, phrase_id) values (?,?)`,
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

  async readAllByPhraseId(id) {
    const [rows] = await this.database.query(
      `      
      SELECT 
        phrases.id phrase_id,
        phrases.phrase, 
        phrases.author_id, 
        phrases.likes, 
        authors.known_name author,
        JSON_ARRAYAGG(events.id) AS events_id, 
        JSON_ARRAYAGG(events.title) AS events_titles
      FROM phrases
      LEFT JOIN events_phrases ep ON phrases.id = ep.phrase_id
      LEFT JOIN events ON ep.event_id = events.id
      INNER JOIN authors ON authors.id = phrases.author_id
      WHERE phrases.id = ?
      `,
      [id]
    );
    return rows[0];
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
