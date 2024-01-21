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
      next();
    }
  } catch (err) {
    next(err);
  }
};

const readToVerifyAuth = async (req, res, next) => {
  try {
    const user = await tables.users.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      req.user = user;
      next();
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
    const verifyEmail = await tables.users.readByEmail(user.email);

    if (verifyEmail) {
      res.status(409).json({
        message: "Email existant. Insérez un different email.",
      });
    } else {
      const insertId = await tables.users.create(user);

      res.status(201).json({ insertId });
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const user = { ...req.body, userId: parseInt(req.params.id, 10) };

  try {
    const updatedId = await tables.users.update(user);
    if (updatedId == null) {
      res.status(204);
    } else {
      res.json(updatedId);
    }
  } catch (err) {
    next(err);
  }
};

const editForgotPassword = async (req, res, next) => {
  const user = {
    newFirstName: req.body.first_name,
    newLastName: req.body.last_name,
    newEmail: req.body.email,
    hashPassword: req.body.hashPassword,
    resetToken: req.body.resetToken,
    expirationTime: req.body.expirationTime,
    userId: req.body.id,
  };

  try {
    const updatedId = await tables.users.updateResetToken(user);

    if (updatedId == null) {
      res.status(204);
    } else {
      req.user = user;

      next();
    }
  } catch (err) {
    next(err);
  }
};

const editUserAfterResetToken = async (req, res, next) => {
  const user = {
    newFirstName: req.body.first_name,
    newLastName: req.body.last_name,
    newEmail: req.body.email,
    hashPassword: req.body.hashPassword,
    resetToken: req.body.resetToken,
    expirationTime: req.body.expirationTime,
    userId: req.body.id,
  };

  try {
    const updatedId = await tables.users.updateAfterCreateResetToken(user);

    if (updatedId == null) {
      res.status(204);
    } else {
      req.user = user;
      res.json(updatedId);
    }
  } catch (err) {
    next(err);
  }
};

const resetPasswordAfterResetTokenCreated = async (req, res, next) => {
  const { token, newPassword } = req.body;

  try {
    const user = await tables.users.readByResetToken(token);

    if (user == null || new Date(user.reset_token_expires_at) < new Date()) {
      res
        .status(404)
        .send({ message: "User not found or invalid or expired token" });
    } else {
      req.body = { ...user, password: newPassword };

      next();
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const userId = await tables.users.delete(id);
    if (userId == null) {
      res.status(204);
    } else {
      res.json(userId);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  readByEmail,
  readToVerifyAuth,
  add,
  edit,
  editForgotPassword,
  editUserAfterResetToken,
  resetPasswordAfterResetTokenCreated,
  destroy,
};
