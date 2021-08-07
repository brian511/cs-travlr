var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlTrips = require('../controllers/trips');
const tripsController = require('../controllers/trips');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/trips', ctrlTrips.tripsList);


module.exports = router;
