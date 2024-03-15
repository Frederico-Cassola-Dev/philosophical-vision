const express = require("express");

const router = express.Router();

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../database/db");

const userControllers = require("./controllers/userControllers");
const userPhraseControllers = require("./controllers/userPhraseControllers");
const phraseControllers = require("./controllers/phraseControllers");
const eventControllers = require("./controllers/eventControllers");
const categoryControllers = require("./controllers/categoryControllers");
const authorControllers = require("./controllers/authorControllers");
const eventPhraseControllers = require("./controllers/eventPhraseControllers");
const periodControllers = require("./controllers/periodControllers");
const philoCurrentControllers = require("./controllers/philoCurrentControllers");
// const googleAuthControllers = require("./controllers/googleAuthControllers");

const {
  checkUserData,
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyToModifyPassword,
  forgotPassword,
  sendEmailResetPassword,
} = require("./services/checkAuth");

// serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize are used to set id as a cookie in the user's browser and to get the id from the cookie when it then used to get user info in a callback.
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Configuring google's strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // passing CLIENT ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Passing CLIENT SECRET, You can get this form https:// console.cloud.google.com/, to know more go on line 113 of this file.
      callbackURL: "/api/auth/google/callback", // This means after sign-in on what route google should redirect
    },
    (accessToken, refreshToken, profile, cb) => {
      // console.log("🚀 - refreshToken:", refreshToken);

      // console.log("🚀 - accessToken:", accessToken);

      // After successful sign-in, we have access of these thing which are in parameters
      //  we are checking wether the user is already added to our database or not, if already exist we can directly give a callback age we can redirect the user to any page we are redirecting it on home page, this functionality is not written in this function, you can check line no. 72.
      db.query(
        "select * from users where google_id = ?",
        [profile.id],
        (err, user) => {
          if (err) {
            cb(err, false);
          }
          if (!err && user.length !== 0) {
            //  checking whether user exist or not
            return cb(null, user);
          }

          //  if user doesn't exist, we are adding the user to database
          return db.query(
            "insert into users set  email = ?, google_name = ?, google_id = ?, photo = ?",
            [
              profile.emails[0].value,
              profile.displayName,
              profile.id,
              profile.photos[0].value,
            ],
            (err2) => {
              if (err2) {
                console.warn("err detected");
                return cb(err, false);
              }
              return db.query(
                "select * from users where googleId = ?",
                [profile.id],
                (err3, user2) => {
                  console.warn("Login/Sign in successfully");
                  return cb(null, user2);
                }
              );
            }
          );
        }
      );
    }
  )
);

//  Passing google authenticate method as a middleware
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// after sign-in the google will redirect to this route as we have added this route in callback URL on line no 26
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // If user exist than ...
    if (req.user) {
      // console.log("the user is", req.user[0]); //Just for debugging
      // Creating a unique token using sign method which is provided by JWT, remember the 2nd parameter should be a secret key and that should have at least length of 20, i have just passed 'rahulnikam' but you should not do the same and this should be kept in environment variable so that no one can see it
      const googleAuthToken = jwt.sign(
        { user_token: req.user[0].googleId },
        process.env.JWT_SECRET,
        { expiresIn: 86400000 }
      );
      // res.cookie will set a cookie in user's header (i mean in users http header😂)
      // we are saying that create a cookie with a name of googleAuthToken and we are passing the token that we generated on line no 80, and the 3rd parameter is the expire of that cookie.
      res.cookie("user_token", googleAuthToken, {
        expires: new Date(Date.now() + 86400 * 1000),
        httpOnly: true,
      });
      // we are now redirecting the user to localhost:3000 which is our frontend
      res.redirect("http://localhost:3000");
    }
  }
);

//  we are making a request from frontend to localhost:5000/auth/login/success, and we are sending user data (remember that don't pass any confidential data line user password or any other)
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: [
        req.user[0].userName,
        req.user[0].userEmail,
        req.user[0].userPhoto,
      ],
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    return res.json({
      logout: req.user,
    });
  });
});

//* OPEN ROUTES
// GOOGLE OAUTH2   -   This routes don't pass by the models
// Passing google authenticate method as a middleware
// router.use("/api/auth", require("./services/passport"));

// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google"),
//   googleAuthControllers.googleCallback
// );
// router.get("/login/success", googleAuthControllers.loginSuccess);
// router.get("/logout", googleAuthControllers.logout);

router.post("/login", userControllers.readByEmail, verifyPassword);
router.post(
  "/forgotPassword",
  userControllers.readByEmail,
  forgotPassword,
  userControllers.editForgotPassword,
  sendEmailResetPassword
);
router.post(
  "/resetPassword",
  userControllers.resetPasswordAfterResetTokenCreated,
  hashPassword,
  userControllers.editUserAfterResetToken
);
router.post("/users", checkUserData, hashPassword, userControllers.add);
router.get("/phrases3", phraseControllers.browse3);

//*---------------------------
//* PROTECTED ROUTES
//*---------------------------

router.use(verifyToken);

//* Users
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post(
  "/users/:id/verifyPassword",
  userControllers.readToVerifyAuth,
  verifyToModifyPassword
);
router.delete("/users/:id", userControllers.destroy);

//* Users_Phrases
router.get(
  "/usersPhrases/favorites/:id",
  userPhraseControllers.readFavoritePhrases
);
router.get("/usersPhrases/totalLikes", userPhraseControllers.sumTotalLikes);
router.get(
  "/usersPhrases/totalLikes/:id",
  userPhraseControllers.sumTotalLikesByPhraseId
);
router.post(
  "/usersPhrases/:userId/favoriteOrLiked/:phraseId",
  userPhraseControllers.replaceFavoriteOrLikedPhrases
);

//* Phrases
router.get("/phrases", phraseControllers.browse);
router.get("/phrases/:id", phraseControllers.read);
router.get("/phrases4/events/:id", phraseControllers.read4ByEventId);
router.get("/phrases4/randomEvents", phraseControllers.read4ByRandomEvent);
router.post("/phrases", phraseControllers.add);
router.put("/phrases/:id", phraseControllers.edit);
router.delete("/phrases/:id", phraseControllers.destroy);

//* Events
router.get("/events", eventControllers.browse);
router.get("/events/:id", eventControllers.read);
router.get("/events/categories/:id", eventControllers.browseAllByCategoryId);
//! I think the route below is not necessary
router.get("/events/search/:title", eventControllers.browseAllByTitle);
router.post("/events", eventControllers.add);
router.put("/events/:id", eventControllers.edit);
router.delete("/events/:id", eventControllers.destroy);

//* Events_Phrases
router.get("/eventPhrase", eventPhraseControllers.browse);
router.get("/eventPhrase/:id", eventPhraseControllers.browseByPhraseId);
router.post("/eventPhrase", eventPhraseControllers.add);
router.delete(
  "/eventPhrase/:phraseId/:eventId",
  eventPhraseControllers.destroy
);

//* Categories
router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.post("/categories", categoryControllers.add);
router.put("/categories/:id", categoryControllers.edit);
router.delete("/categories/:id", categoryControllers.destroy);

//* Authors
router.get("/authors", authorControllers.browse);
router.get("/authors/:id", authorControllers.read);
router.post("/authors", authorControllers.add);
router.put("/authors/:id", authorControllers.edit);
router.delete("/authors/:id", authorControllers.destroy);

//* Periods
router.get("/periods", periodControllers.browse);
router.get("/periods/:id", periodControllers.read);
router.post("/periods", periodControllers.add);

//* Philo Currents
router.get("/philoCurrents", philoCurrentControllers.browse);
router.get("/philoCurrents/:id", philoCurrentControllers.read);
router.post("/philoCurrents", philoCurrentControllers.add);

module.exports = router;
