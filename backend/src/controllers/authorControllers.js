const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const authors = await tables.authors.readAll();

    res.json(authors);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const author = await tables.authors.read(req.params.id);

    if (author == null) {
      res.sendStatus(404);
    } else {
      res.json(author);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const author = req.body;

  try {
    const insertId = await tables.authors.create(author);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const author = {
    ...req.body.newModifiedAuthor,
    id: parseInt(req.params.id, 10),
  };

  try {
    const updatedId = await tables.authors.update(author);
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
    const authorId = await tables.authors.delete(id);
    if (authorId == null) {
      res.status(204);
    } else {
      res.json(authorId);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
};
