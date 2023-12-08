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

const read4ByEventId = async (req, res, next) => {
  try {
    const phrases = await tables.phrases.read4ByEventId(req.params.id);

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
  // console.log("🚀 - phrase:", phrase)

  try {
    const insertId = await tables.phrases.create(phrase);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const phrase = { ...req.body, phraseId: parseInt(req.params.id, 10) };

  try {
    const updatedId = await tables.phrases.update(phrase);
    if (updatedId == null) {
      res.status(204);
    } else {
      res.json(updatedId);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const phraseId = await tables.phrases.delete(id);
    if (phraseId == null) {
      res.status(204);
    } else {
      res.json(phraseId);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  browse5,
  read,
  read4ByRandomEvent,
  read4ByEventId,
  edit,
  add,
  destroy,
};
