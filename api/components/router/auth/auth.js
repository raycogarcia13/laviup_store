const express = require('express');
const router = express.Router();

const { 
 login,
 register,
 verify
 } = require('../../controllers/Auth/AuthControllers')

const { isAuthenticatedUser, authorizeRole } = require("../../middlewares/auth")

router.post('/login', login);
router.post('/register', register);
router.post('/verify', verify);

module.exports = router;
