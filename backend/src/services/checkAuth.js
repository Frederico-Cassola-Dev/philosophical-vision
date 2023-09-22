const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  time: 5,
  parellelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashPassword = hashedPassword;

      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("Error saving user");
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        res.status(200).json({ isLogged: true });
      } else {
        res.status(401).json({
          isLogged: false,
          message: "Email or password not correct",
        });
      }
    })
    .catch((err) => console.error(err));
};

module.exports = { hashPassword, verifyPassword };
