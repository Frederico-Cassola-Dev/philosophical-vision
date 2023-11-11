const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const usersPhrases = await tables.users_phrases.readAll();
    res.json(usersPhrases);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const userPhrase = await tables.users_phrases.read(req.params.id);

    if (userPhrase == null) {
      res.sendStatus(404);
    } else {
      res.json(userPhrase);
      next();
    }
  } catch (err) {
    next(err);
  }
};
const readFavoritePhrases = async (req, res, next) => {
  try {
    const userPhrase = await tables.users_phrases.readFavoritePhrases(
      req.params.id
    );

    if (userPhrase == null) {
      res.sendStatus(404);
    } else {
      res.json(userPhrase);
      next();
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.users_phrases.create(user);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const user = { ...req.body, userId: parseInt(req.params.id, 10) };

  try {
    const updatedId = await tables.users_phrases.update(user);
    if (updatedId == null) {
      res.status(204);
    } else {
      res.json(updatedId);
    }
  } catch (err) {
    next(err);
  }
};
const replace = async (req, res, next) => {
  const userPhrase = {
    ...req.body,
    userId: parseInt(req.params.userId, 10),
    phraseId: parseInt(req.params.phraseId, 10),
  };

  try {
    const updatedId = await tables.users_phrases.replaceFavoritePhrases(
      userPhrase
    );
    if (updatedId == null) {
      res.status(204);
    } else {
      res.json(updatedId);
    }
  } catch (err) {
    next(err);
  }
};

const editFavoritePhrases = async (req, res, next) => {
  const userPhrase = {
    ...req.body,
    userId: parseInt(req.params.userId, 10),
    phraseId: parseInt(req.params.phraseId, 10),
  };

  try {
    const updatedId = await tables.users_phrases.updateFavoritePhrases(
      userPhrase
    );
    if (updatedId == null) {
      res.status(204);
    } else {
      res.json(updatedId);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  readFavoritePhrases,
  add,
  edit,
  editFavoritePhrases,
  replace,
};
