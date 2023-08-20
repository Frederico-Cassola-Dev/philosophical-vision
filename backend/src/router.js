const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./public/assets/avatar" });

const uploadAvatar = require("./services/uploadAvatar");
const userControllers = require("./controllers/userControllers");
const phraseControllers = require("./controllers/phraseControllers");
const eventControllers = require("./controllers/eventControllers");
const categoryControllers = require("./controllers/categoryControllers");

router.post("/avatar", upload.single("avatar"), uploadAvatar.postAvatar);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", userControllers.add);

router.get("/phrases", phraseControllers.browse);
router.get("/phrases5", phraseControllers.browse5);
router.get("/phrases/:id", phraseControllers.read);
router.get("/phrases4/randomevents", phraseControllers.read4ByRandomEvent);
router.post("/phrases", phraseControllers.add);

router.get("/events", eventControllers.browse);
router.get("/events/categories/:id", eventControllers.browseAllByCategoryId);
router.get("/events/:title", eventControllers.browseAllByTitle);
router.get("/events/:id", eventControllers.read);

router.post("/events", eventControllers.add);

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.post("/categories", categoryControllers.add);

module.exports = router;
