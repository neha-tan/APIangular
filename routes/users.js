const express = require('express');
const customerController = require('../controller/customer.controller');

const router = express.Router();

router.post("/signup", customerController.signup);
router.post("/signin", customerController.signin);
module.exports = router;