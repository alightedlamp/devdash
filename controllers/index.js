const express = require('express');
const router = express.Router();

router.use('/', require('./root.js'));
router.use('/project', require('./project.js'));
router.use('/milestone', require('./milestone.js'));
router.use('/dashboard', require('./dashboard.js'));
router.use('/user', require('./user.js'));
router.use('/resource', require('./resource.js'));

module.exports = router;
