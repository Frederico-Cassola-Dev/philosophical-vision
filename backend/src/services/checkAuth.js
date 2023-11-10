const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  time: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  if (req.body.password) {
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
  } else {
    next();
  }
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: "24h",
        });
        delete req.user.password;
        res
          .status(200)
          .cookie("user_token", token, {
            httpOnly: false,
            expires: new Date(Date.now() + 1000 * 60),
          })
          .send({ token, user: req.user, auth: true });
      } else {
        res.status(401).send({
          message: "Email or password not correct",
          auth: false,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  // console.log(req.cookies);
  if (req.cookies) {
    jwt.verify(
      req.cookies.user_token,
      process.env.TOKEN_SECRET,
      (err, decode) => {
        if (err) {
          res.status(401).send("Not connected");
        } else {
          req.user_token = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send("Email or password not correct");
  }
};

const verifyToModifyPassword = (req, res) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        delete req.user.password;
        res.status(200).send({ message: "Old password correct", auth: true });
      } else {
        res.status(200).send({
          message: "Password not correct",
          auth: false,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyToModifyPassword,
};
