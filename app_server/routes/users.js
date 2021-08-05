const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

/*GET homepage */
router.get('/', controller.users);

module.exports = router;
