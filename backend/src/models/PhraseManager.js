const AbstractManager = require("./AbstractManager");

class PhraseManager extends AbstractManager {
  constructor() {
    super({ table: "phrases" });
  }

  async create(phrase) {
    const [result] = await this.database.query(
      `insert into ${this.table} (phrase, authors_id) values (?,?)`,
      [phrase.phrase, phrase.authorId]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select
      p.id,
      phrase,
      likes,
      is_favorite,
      authors_id,
      a.known_name as author,
      ep.events_id, 
      e.title event_title
      from ${this.table} p
      inner join authors as a on a.id = p.authors_id 
      inner join events_phrases ep on ep.phrases_id = p.id
    inner join events e on e.id = ep.events_id
      where p.id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select 
    ${this.table}.id,
    phrase,
    likes,
    is_favorite,
    authors_id,
    a.known_name as author
    from ${this.table} 
    inner join authors as a on a.id = ${this.table}.authors_id
    `);

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
      `SELECT p.id phrase_id, p.phrase, p.likes, p.is_favorite, p.authors_id, ep.events_id, e.title event_title, a.known_name as author FROM ${this.table} p
    inner join events_phrases ep on ep.phrases_id = p.id
    inner join events e on e.id = ep.events_id
    inner join authors as a on a.id = p.authors_id
    where e.id = ?
    order by rand()
    limit 4`,
      [id]
    );

    return rows;
  }

  async update(phrase) {
    const [rows] = await this.database.query(
      `update ${this.table} p 
      inner join events_phrases ep on ep.phrases_id = p.id
      inner join events e on e.id = ep.events_id
      set phrase = ?, likes = ?, is_favorite = ?, authors_id = ?, ep.events_id = ?
       where p.id = ?`,
      [
        phrase.phrase,
        phrase.likes,
        phrase.is_favorite,
        phrase.authors_id,
        phrase.events_id,
        phrase.phraseId,
      ]
    );
    return rows;
  }
}

module.exports = PhraseManager;
