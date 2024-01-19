// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const categories = await tables.categories.readAll();

    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const category = await tables.categories.read(req.params.id);

    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const category = req.body;

  try {
    const insertId = await tables.categories.create(category);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const category = { ...req.body, categoryId: parseInt(req.params.id, 10) };

  try {
    const updatedId = await tables.categories.update(category);
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
    const categoryId = await tables.categories.delete(id);
    if (categoryId == null) {
      res.status(204);
    } else {
      res.json(categoryId);
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
