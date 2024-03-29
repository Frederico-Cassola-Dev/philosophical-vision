const Joi = require("joi");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const registrationSchema = () => {
  return Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr", "pt"] },
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/
      )
      .required(),
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const checkUserData = (req, res, next) => {
  const { error } = registrationSchema("required").validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({ message: "Invalid data" });
  } else {
    next();
  }
};

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
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
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

const forgotPassword = (req, res, next) => {
  const { user } = req;
  const payload = { sub: user.id };
  const resetToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });

  delete req.user.password;

  const expirationTime = new Date();

  expirationTime.setHours(expirationTime.getHours() + 1);

  req.body = { ...user, resetToken, expirationTime, userId: req.user.id };

  next();
};

const sendEmailResetPassword = (req, res) => {
  const { newEmail, resetToken } = req.user;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: newEmail,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ message: "Failed to send reset email" });
    }
    return res.json({ message: "Password reset email sent successfully" });
  });
};

module.exports = {
  checkUserData,
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyToModifyPassword,
  forgotPassword,
  sendEmailResetPassword,
};
