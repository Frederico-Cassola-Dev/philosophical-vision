const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const events = await tables.events.readAll();
    res.json(events);
  } catch (err) {
    next(err);
  }
};
const browseAllByCategoryId = async (req, res, next) => {
  try {
    const events = await tables.events.readAllByCategoryId(req.params.id);
    res.json(events);
  } catch (err) {
    next(err);
  }
};
const browseAllByTitle = async (req, res, next) => {
  try {
    const events = await tables.events.readAllByTitle(req.params.title);

    res.json(events);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const event = await tables.events.read(req.params.id);
    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const event = req.body;
  try {
    const insertId = await tables.events.create(event);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  browseAllByCategoryId,
  browseAllByTitle,
  read,
  add,
};
