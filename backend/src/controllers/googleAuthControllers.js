// Importing all required packages
require("dotenv/config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const tables = require("../tables");
const db = require("../../database/db");

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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Passing CLIENT SECRET, You can get this form https://console.cloud.google.com/, to know more go on line 113 of this file.
      callbackURL: "/auth/google/callback", // This means after sign-in on what route google should redirect
    },
    async (accessToken, refreshToken, profile, cb) => {
      // After successful sign-in, we have access of these thing which are in parameters
      // we are checking wether the user is already added to our database or not, if already exist we can directly give a callback age we can redirect the user to any page we are redirecting it on home page, this functionality is not written in this function, you can check line no. 72.

      const userFromDB = await tables.users.readByGoogleId(profile.id);

      if (userFromDB.length !== 0) {
        // checking whether userFromDB exist or not
        return cb(null, userFromDB);
      }
      // const userProfile = await tables.users;

      return db.query(
        "select * from users where googleId = ?",
        [profile.id],
        (err, user) => {
          if (err) {
            cb(err, false);
          }
          if (!err && user.length !== 0) {
            // checking whether user exist or not
            return cb(null, user);
          }

          // if user doesn't exist, we are adding the user to database
          return db.query(
            "insert into users set  email = ?, google_name = ?, googleId = ?, photo = ?",
            [
              profile.emails[0].value,
              profile.displayName,
              profile.id,
              profile.photos[0].value,
            ],
            (error) => {
              if (error) {
                console.error("err detected");
                return cb(err, false);
              }
              return db.query(
                "select * from users where googleId = ?",
                [profile.id],
                (error2, user2) => {
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

// after sign-in the google will redirect to this route as we have added this route in callback URL on line no 26
const googleCallback = (req, res) => {
  // If user exist than ...

  if (req.user) {
    /* console.log("the user is", req.user[0]); //Just for debugging
    Creating a unique token using sign method which is provided by JWT, remember the 2nd parameter should be a secret key and that should have at least length of 20, i have just passed 'rahulnikam' but you should not do the same and this should be kept in environment variable so that no one can see it
*/
    const googleAuthToken = jwt.sign(
      { googleAuthToken: req.user[0].googleId },
      process.env.JWT_SECRET,
      { expiresIn: 86400000 }
    );
    /*
     res.cookie will set a cookie in user's header (i mean in users http header😂)
     we are saying that create a cookie with a name of googleAuthToken and we are passing the token that we generated on line no 80, and the 3rd parameter is the expire of that cookie.
      */
    res.cookie("googleAuthToken", googleAuthToken, {
      expires: new Date(Date.now() + 86400 * 1000),
      httpOnly: true,
    });
    // we are now redirecting the user to localhost:3000 which is our frontend
    res.redirect("http://localhost:3000");
  }
};

// we are making a request from frontend to localhost:5000/auth/login/success, and we are sending user data (remember that don't pass any confidential data line user password or any other)
const loginSuccess = (req, res) => {
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
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    return res.json({
      logout: req.user,
    });
  });
};

module.exports = {
  googleCallback,
  loginSuccess,
  logout,
};
