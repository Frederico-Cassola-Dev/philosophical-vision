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

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyToModifyPassword,
} = require("./services/checkAuth");

//* OPEN ROUTES
router.post("/login", userControllers.readByEmail, verifyPassword);
router.post("/users", hashPassword, userControllers.add);
router.get("/phrases5", phraseControllers.browse5);

//*---------------------------
//* PROTECTED ROUTES
//*---------------------------
router.use(verifyToken);

//* Users
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post(
  "/users/:id/verifypassword",
  userControllers.readToVerifyAuth,
  verifyToModifyPassword
);
//* Users_Phrases
router.get(
  "/usersPhrases/favorites/:id",
  userPhraseControllers.readFavoritePhrases
);
// router.put("/usersphrases/likes/:id", userPhraseControllers.editLikes);
router.post(
  "/usersPhrases/:userId/favorites/:phraseId",
  userPhraseControllers.replace
);

//* Phrases
router.get("/phrases", phraseControllers.browse);
router.get("/phrases/:id", phraseControllers.read);
router.get("/phrases4/events/:id", phraseControllers.read4ByEventId);
router.get("/phrases4/randomevents", phraseControllers.read4ByRandomEvent);
router.post("/phrases", phraseControllers.add);
router.put("/phrases/:id", phraseControllers.edit);
router.put("/phrases/likes/:id", phraseControllers.editLikes);
router.delete("/phrases/:id", phraseControllers.destroy);

//* Events
router.get("/events", eventControllers.browse);
router.get("/events/categories/:id", eventControllers.browseAllByCategoryId);
router.get("/events/:title", eventControllers.browseAllByTitle);
router.get("/events/:id", eventControllers.read);
router.post("/events", eventControllers.add);

//* Events_Phrases
router.get("/eventphrase", eventPhraseControllers.browse);
router.get("/eventphrase/:id", eventPhraseControllers.browseByPhraseId);
router.post("/eventphrase", eventPhraseControllers.add);
router.delete(
  "/eventphrase/:phraseId/:eventId",
  eventPhraseControllers.destroy
);

//* Categories
router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.post("/categories", categoryControllers.add);

//* Authors
router.get("/authors", authorControllers.browse);
router.get("/authors/:id", authorControllers.read);
router.post("/authors", authorControllers.add);

//* Periods
router.get("/periods", periodControllers.browse);
router.get("/periods/:id", periodControllers.read);
router.post("/periods", periodControllers.add);

module.exports = router;
