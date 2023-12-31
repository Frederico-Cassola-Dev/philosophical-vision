const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "authors" });
  }

  async create(author) {
    const [result] = await this.database.query(
      `insert into ${this.table} (known_name, firstname, lastname, period_id, philo_current, born_date, dead_date, era) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        author.knownName,
        author.firstName,
        author.lastName,
        author.periodId,
        author.philoCurrent,
        author.bornDate,
        author.deadDate,
        author.era,
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

  async readAll() {
    const [rows] = await this.database.query(
      `select a.id, known_name, firstname, lastname, p.title period_title, philo_current, born_date, dead_date, era from ${this.table} a
      inner join periods p on p.id = a.period_id
      `
    );
    return rows;
  }
}

module.exports = UserManager;
