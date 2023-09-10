const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const eventsPhrases = await tables.events_phrases.readAll();
    res.json(eventsPhrases);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const event = await tables.events_phrases.read(req.params.id);

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
  const eventPhrase = req.body;

  try {
    const insertId = await tables.events_phrases.create(eventPhrase);
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
