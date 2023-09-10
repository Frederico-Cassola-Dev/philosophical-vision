const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const periods = await tables.periods.readAll();

    res.json(periods);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const period = await tables.periods.read(req.params.id);

    if (period == null) {
      res.sendStatus(404);
    } else {
      res.json(period);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const period = req.body;

  try {
    const insertId = await tables.periods.create(period);

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
