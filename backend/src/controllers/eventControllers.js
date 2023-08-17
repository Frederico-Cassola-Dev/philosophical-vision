// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const events = await tables.events.readAll();

    // Respond with the items in JSON format
    res.json(events);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const browseAllByCategoryId = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const events = await tables.events.readAllByCategoryId(req.params.id);

    // Respond with the items in JSON format
    res.json(events);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const browseAllByTitle = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const events = await tables.events.readAllByTitle(req.params.title);

    // Respond with the items in JSON format
    res.json(events);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const event = await tables.events.read(req.params.id);

    // If the event is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the event in JSON format
    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const event = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.events.create(event);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  browseAllByCategoryId,
  browseAllByTitle,
  read,
  // edit,
  add,
  // destroy,
};
