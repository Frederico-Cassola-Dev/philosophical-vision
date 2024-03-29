const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const eventsPhrases = await tables.events_phrases.readAll();
    res.json(eventsPhrases);
  } catch (err) {
    next(err);
  }
};

const browseByPhraseId = async (req, res, next) => {
  try {
    const events = await tables.events_phrases.readAllByPhraseId(req.params.id);

    if (events == null) {
      res.sendStatus(404);
    } else {
      res.json(events);
    }
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
  // console.log("🚀 - eventPhrase:", eventPhrase)

  try {
    const insertId = await tables.events_phrases.create(eventPhrase);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const eventId = parseInt(req.params.eventId, 10);
  const phraseId = parseInt(req.params.phraseId, 10);
  try {
    const eventPhrase = await tables.events_phrases.delete(eventId, phraseId);
    if (eventPhrase == null) {
      res.status(204);
    } else {
      res.json(eventPhrase);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  browseByPhraseId,
  add,
  destroy,
};
