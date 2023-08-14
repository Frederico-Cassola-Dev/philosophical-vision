const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const phraseControllers = require("./controllers/phraseControllers");
const eventControllers = require("./controllers/eventControllers");
const categoryControllers = require("./controllers/categoryControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", userControllers.add);

router.get("/phrases", phraseControllers.browse);
router.get("/phrases/:id", phraseControllers.read);
router.post("/phrases", phraseControllers.add);

router.get("/events", eventControllers.browse);
router.get("/events/categories/:id", eventControllers.browseAllByCategoryId);
router.get("/events/:id", eventControllers.read);

router.post("/events", eventControllers.add);

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.post("/categories", categoryControllers.add);

/* ************************************************************************* */

module.exports = router;
