const express = require('express');
const router = express.Router();

const { 
 getAll
 } = require('../controllers/store/ProductControllers')

router.get('/products/:filter?', getAll);

module.exports = router;
