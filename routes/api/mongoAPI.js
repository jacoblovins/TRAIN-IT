const router = require("express").Router();
const mongoQueries = require("../../controllers/mongoQueries");

// Find all books in the database or create one
router.route("/")
  .get(mongoQueries.findAll)
  .post(mongoQueries.create)
// get, delete, and update individual books
router.route("/:id")
  .get(mongoQueries.findById)
  .delete(mongoQueries.remove)
  .put(mongoQueries.update)

module.exports = router;
