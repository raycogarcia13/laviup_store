const express = require('express');
let router = express.Router();

const cruds = require("../utils/cruds")

const { update, getStores, create, logoStore, all } = require('../controllers/store/StoreControllers')

const { get, addProduct, removeProduct, importProducts } = require('../controllers/store/ProductControllers')

const { isAuthenticatedUser, authorizeRole } = require("../middlewares/auth")


const { logoUpload, imageUpload, filesUpload } = require('../middlewares/filesUpload')
router.post('/logo/:id',logoUpload.single('file'), isAuthenticatedUser, logoStore);
router.post('/', isAuthenticatedUser, create);
router.put('/:id', isAuthenticatedUser, update);
router.get('/',isAuthenticatedUser, getStores);
router.get('/all',isAuthenticatedUser, all);

router.get('/products',isAuthenticatedUser, get);
router.delete('/products/:id',isAuthenticatedUser, removeProduct);
router.post('/products',isAuthenticatedUser,imageUpload.single('file'),addProduct);

router.post('/products_import',isAuthenticatedUser,filesUpload.single('file'), importProducts);


module.exports = router;

