const AbstractManager = require("./AbstractManager");

class UserPhraseManager extends AbstractManager {
  constructor() {
    super({ table: "users_phrases" });
  }

  async create(userPhrase) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, password) values (?, ?, ?, ?)`,
      [
        userPhrase.firstName,
        userPhrase.lastName,
        userPhrase.email,
        userPhrase.hashPassword,
      ]
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

  async readFavoritePhrases(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [id]
    );

    return rows;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async replaceFavoriteOrLikedPhrases(userPhrase) {
    const [rows] = await this.database.query(
      `
        REPLACE
        INTO ${this.table} (id, user_id, phrase_id, is_liked, is_favorite)
        values (?, ?, ?, ?, ?)
       
      `,
      [
        userPhrase.usersPhrasesId,
        userPhrase.userId,
        userPhrase.phraseId,
        userPhrase.isLiked,
        userPhrase.isFavorite,
      ]
    );
    return rows;
  }
}

module.exports = UserPhraseManager;
