const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "authors" });
  }

  async create(author) {
    const [result] = await this.database.query(
      `insert into ${this.table} (known_name, first_name, last_name, period_id, philo_current_id, born_date, dead_date, era) values (?, ?, ?, ?, ?, ?, ?, ?)`,
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
      `
      select a.id, known_name, first_name, last_name, p.id period_id, p.title period_title, philo_current_id, pc.title philo_current_title, born_date, dead_date, era from ${this.table} a
      inner join periods p on p.id = a.period_id
      inner join philo_currents pc on pc.id = a.philo_current_id 
      where a.id = ?
      `,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(
      `
      select a.id, known_name, first_name, last_name, p.title period_title, philo_current_id, pc.title philo_current_title, born_date, dead_date, era from ${this.table} a
      inner join periods p on p.id = a.period_id
      inner join philo_currents pc on pc.id = a.philo_current_id
      `
    );
    return rows;
  }

  async update(author) {
    const [rows] = await this.database.query(
      `
      update ${this.table}
      set 
        known_name = ?,
        first_name = ?,
        last_name = ?,
        period_id = ?,
        philo_current_id = ?,
        born_date = ?,
        dead_date = ?,
        era = ?
      where id = ?
      `,
      [
        author.newKnownName,
        author.newFirstName,
        author.newLastName,
        author.newPeriod,
        author.newPhiloCurrent,
        author.newBornDate,
        author.newDeadDate,
        author.newEra,
        author.id,
      ]
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

module.exports = UserManager;
