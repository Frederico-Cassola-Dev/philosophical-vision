const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.users.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.users.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const readByEmail = async (req, res, next) => {
  const user = await tables.users.readByEmail(req.body.email);

  try {
    if (user == null) {
      res.status(404).send({ message: "User not found" });
    } else {
      req.user = user;

      next();
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;
  try {
    const insertId = await tables.users.create(user);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  readByEmail,
  add,
};
