// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const phrases = await tables.phrases.readAll();

    res.json(phrases);
  } catch (err) {
    next(err);
  }
};

const browse5 = async (req, res, next) => {
  try {
    const phrases = await tables.phrases.read5();

    res.json(phrases);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const phrase = await tables.phrases.read(req.params.id);

    if (phrase == null) {
      res.sendStatus(404);
    } else {
      res.json(phrase);
    }
  } catch (err) {
    next(err);
  }
};

const read4ByRandomEvent = async (req, res, next) => {
  try {
    const phrases = await tables.phrases.read4ByRandomEvent();

    if (phrases == null) {
      res.sendStatus(404);
    } else {
      res.json(phrases);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const phrase = req.body;

  try {
    const insertId = await tables.phrases.create(phrase);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  browse5,
  read,
  read4ByRandomEvent,
  // edit,
  add,
  // destroy,
};
