const AbstractManager = require("./AbstractManager");

class PhraseManager extends AbstractManager {
  constructor() {
    super({ table: "phrases" });
  }

  async create(phrase) {
    const [result] = await this.database.query(
      `insert into ${this.table} (phrase, author_id) values (?,?)`,
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
        author_id,
        a.known_name as author,
        ep.event_id, 
        e.title event_title
        from ${this.table} p
        inner join authors a on a.id = p.author_id 
        inner join events_phrases ep on ep.phrase_id = p.id
        inner join events e on e.id = ep.event_id
        where p.id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select 
        p.id,
        phrase,
        likes,
        is_favorite,
        author_id,
        a.known_name as author,
        group_concat( e.title SEPARATOR ', ') event_title
        from ${this.table} p
        inner join authors a on a.id = p.author_id
        left join events_phrases ep on p.id = ep.phrase_id
        left join events e on e.id = ep.event_id
        group by p.id`
    );

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
      `SELECT p.id phrase_id, p.phrase, p.likes, p.is_favorite, ep.event_id, e.title event_title FROM ${this.table} p
        inner join events_phrases ep on ep.phrase_id = p.id
        inner join events e on e.id = ep.event_id
        order by rand()
        limit 4`
    );

    return rows;
  }

  async read4ByEventId(id) {
    const [rows] = await this.database.query(
      `SELECT p.id phrase_id, p.phrase, p.likes, p.is_favorite, p.author_id, ep.event_id, e.title event_title, a.known_name as author FROM ${this.table} p
        inner join events_phrases ep on ep.phrase_id = p.id
        inner join events e on e.id = ep.event_id
        inner join authors as a on a.id = p.author_id
        where e.id = ?
        order by rand()
        limit 4`,
      [id]
    );

    return rows;
  }

  async update(phrase) {
    const [idsFromEventsPhrasesTableThatMAtchPhraseIdToChange] =
      await this.database.query(
        `
      SELECT * from events_phrases
      WHERE phrase_id = ?;
      `,
        [phrase.phraseId]
      );
    console.log(
      "🚀 - idsFromEventsPhrasesTableThatMAtchPhraseIdToChange:",
      idsFromEventsPhrasesTableThatMAtchPhraseIdToChange
    );

    console.log("phrase obj", phrase);

    const eventsIdsInDB =
      idsFromEventsPhrasesTableThatMAtchPhraseIdToChange.map(
        (item) => item.event_id
      );
    console.log("🚀 - eventsIdsInDB:", eventsIdsInDB);

    // ------ No changes on events ------

    if (
      phrase.events.length ===
      idsFromEventsPhrasesTableThatMAtchPhraseIdToChange.length
    ) {
      let updateQuery = "";

      idsFromEventsPhrasesTableThatMAtchPhraseIdToChange.forEach(
        (item, index) => {
          updateQuery += `WHEN ep.id = ${item.id} THEN ${phrase.events[index]} `;
        }
      );

      const queryToUpdate = `
        UPDATE events_phrases ep
        INNER JOIN ${this.table} p ON p.id = ep.phrase_id
        SET 
          event_id = 
            CASE ${updateQuery}
              END, 
          p.phrase = ?, 
          p.author_id = ?
        WHERE ep.phrase_id = ?;
  `;

      const [rows] = await this.database.query(queryToUpdate, [
        phrase.phrase,
        phrase.author_id,
        phrase.phraseId,
      ]);

      return rows;
    }

    // ------ Add events ------

    if (
      phrase.events.length >
      idsFromEventsPhrasesTableThatMAtchPhraseIdToChange.length
    ) {
      const newEventsToAdd = phrase.events.filter(
        (value) => !eventsIdsInDB.includes(value)
      );

      let insertQuery = ``;

      if (newEventsToAdd.length > 1) {
        newEventsToAdd.forEach((value) => {
          insertQuery += `(${value}, ${phrase.phraseId}), `;
        });

        insertQuery = insertQuery.slice(0, -2);
      } else {
        insertQuery += `(${newEventsToAdd[0]}, ${phrase.phraseId})`;
      }

      const [insertResult] = await this.database.query(
        `insert into events_phrases (event_id, phrase_id) 
        values ${insertQuery}`
      );

      const [updateRows] = await this.database.query(
        `UPDATE  ${this.table}
          SET
            phrase = ?, author_id = ?
          WHERE id = ?
    `,
        [phrase.phrase, phrase.author_id, phrase.phraseId]
      );

      return [insertResult.insertId, updateRows];
    }

    // ------ Delete events ------

    const eventsToDelete = eventsIdsInDB.filter(
      (value) => !phrase.events.includes(value)
    );

    let deleteQuery = ``;

    eventsToDelete.forEach((value) => {
      deleteQuery += `(${value}, ${phrase.phraseId}), `;
    });

    deleteQuery = deleteQuery.slice(0, -2);

    const [rows] = await this.database.query(
      `DELETE events_phrases
        FROM events_phrases
        WHERE (event_id, phrase_id) IN (${deleteQuery})
  `
    );

    const [updateRows] = await this.database.query(
      `UPDATE  ${this.table}
        SET
          phrase = ?, author_id = ?
        WHERE id = ?
  `,
      [phrase.phrase, phrase.author_id, phrase.phraseId]
    );

    return [rows, updateRows];
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

module.exports = PhraseManager;
