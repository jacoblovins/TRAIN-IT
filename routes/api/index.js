const router = require("express").Router();
const fs = require('fs');


// set up routes for collectin data and classification data
router.use("/collect", (req, res) => {
    const collectData = req.body.data;
    fs.writeFile('client/public/data/training.json', collectData, function (err) {
        if (err) throw err;
        console.log('training.json File Saved!');
    })
});



router.use("/model", (req, res) => {
    const metaData = req.body.data;
    const modelData = req.body.data;
    const weightsData = req.body.data;
    fs.writeFile('client/public/data/model_meta.json', collectData, function (err) {
        if (err) throw err;
        console.log('training.json File Saved!');
    })
    fs.writeFile('client/public/data/model.json', collectData, function (err) {
        if (err) throw err;
        console.log('training.json File Saved!');
    })
    fs.writeFile('client/public/data/model.weights.bin', collectData, function (err) {
        if (err) throw err;
        console.log('training.json File Saved!');
    })
});

module.exports = router;
