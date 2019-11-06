const express = require('express');
const router = express.Router();

router.use('/user', require('./api/user'));
router.use('/package', require('./api/package'));
router.use('/admin', require('./api/admin'))
router.use('/facilites', require('./api/facilites'))

module.exports = router;