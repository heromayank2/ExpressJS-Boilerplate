const express = require('express');
const router = express.Router();

router.use('/nari', require('./api/nari'));
router.use('/article', require('./api/article'));
router.use('/admin', require('./api/admin'));

module.exports = router;