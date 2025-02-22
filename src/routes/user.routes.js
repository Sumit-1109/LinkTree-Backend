const express = require('express');
const router = express.Router();
const {signup, signin, userinfo} = require('../controllers/user.controller')

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/userinfo', userinfo);

module.exports = router;