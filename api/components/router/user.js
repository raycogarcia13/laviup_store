const express = require('express');
let router = express.Router();

const cruds = require("../utils/cruds")

const User = require('../models/User')

// const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")

router = cruds(User);
// router = cruds(User, false,'admin','paco');


module.exports = router;
