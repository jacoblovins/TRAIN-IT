const mongoRoutes = require("./mongoAPI");
const googleRoutes = require("./googleAPI");
const router = require("express").Router();

// set up routes for mongo and google API
router.use("/books", mongoRoutes);
router.use("/google", googleRoutes);

module.exports = router;
