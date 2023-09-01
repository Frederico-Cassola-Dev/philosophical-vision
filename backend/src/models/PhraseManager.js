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

  async read4ByRandomEvent() {
    const [rows] = await this.database.query(
      `SELECT p.id phrase_id, p.phrase, p.likes, p.is_favorite, ep.events_id, e.title event_title FROM ${this.table} p
    inner join events_phrases ep on ep.phrases_id = p.id
    inner join events e on e.id = ep.events_id
    order by rand()
    limit 4`
    );

    return rows;
  }

  async read4ByEventId(id) {
    const [rows] = await this.database.query(
      `SELECT p.id phrase_id, p.phrase, p.likes, p.is_favorite, p.authors_id, ep.events_id, e.title event_title FROM ${this.table} p
    inner join events_phrases ep on ep.phrases_id = p.id
    inner join events e on e.id = ep.events_id
    where e.id = ?
    order by rand()
    limit 4`,
      [id]
    );

    return rows;
  }

  async update(phrase) {
    const [rows] = await this.database.query(
      `update ${this.table} 
      set phrase = ?, likes = ?, is_favorite = ?, authors_id = ? where id = ?`,
      [
        phrase.phrase,
        phrase.likes,
        phrase.is_favorite,
        phrase.authors_id,
        phrase.phraseId,
      ]
    );
    return rows;
  }
}

module.exports = PhraseManager;
