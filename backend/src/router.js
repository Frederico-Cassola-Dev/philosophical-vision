const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const userPhraseControllers = require("./controllers/userPhraseControllers");
const phraseControllers = require("./controllers/phraseControllers");
const eventControllers = require("./controllers/eventControllers");
const categoryControllers = require("./controllers/categoryControllers");
const authorControllers = require("./controllers/authorControllers");
const eventPhraseControllers = require("./controllers/eventPhraseControllers");
const periodControllers = require("./controllers/periodControllers");
const philoCurrentControllers = require("./controllers/philoCurrentControllers");

const {
  checkUserData,
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyToModifyPassword,
  forgotPassword,
  sendEmailResetPassword,
} = require("./services/checkAuth");

//* OPEN ROUTES
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
