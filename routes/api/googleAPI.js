const router = require("express").Router();
const apiQueries = require("../../controllers/apiQueries");

router.route("/").get(apiQueries.findAll);

module.exports = router;
