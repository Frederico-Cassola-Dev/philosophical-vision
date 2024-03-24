const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const philoCurrents = await tables.philo_currents.readAll();

    res.json(philoCurrents);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const philoCurrent = await tables.philo_currents.read(req.params.id);

    if (philoCurrent == null) {
      res.sendStatus(404);
    } else {
      res.json(philoCurrent);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const philoCurrent = req.body;

  try {
    const insertId = await tables.philo_currents.create(philoCurrent);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
};
