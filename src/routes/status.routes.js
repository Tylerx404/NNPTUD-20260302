const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/enable', userController.enableUser);
router.post('/disable', userController.disableUser);

module.exports = router;
