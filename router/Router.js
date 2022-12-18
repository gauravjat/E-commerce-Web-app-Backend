const express = require('express');
const router = express.Router();
const getUser = require('../controller/User');
const getAdmin = require('../controller/Admin');
const adminAuth = require('../middleware/Authentication');
const userAuth = require('../middleware/Authentication');

router.post('/admin/signup', getAdmin.adminSignup);
router.post('/admin/signin', getAdmin.adminSignin);
router.post('/admin/addproduct', adminAuth.userAuthentication, getAdmin.addData);
router.get('/search/product/:name', adminAuth.userAuthentication, getAdmin.searchProduct);
router.get('/sort/product', adminAuth.userAuthentication, getAdmin.sortProduct);
router.get('/admin/allproduct', adminAuth.userAuthentication, getAdmin.getAllProduct);
router.get('/product/count', adminAuth.userAuthentication, getAdmin.countAllProduct);
router.put('/update/product/:id', adminAuth.userAuthentication, getAdmin.updateProductData);
router.get('/search/cartdata/:userID', adminAuth.userAuthentication, getAdmin.searchCartData);
router.delete('/delete/product/:id',adminAuth.userAuthentication,getAdmin.deleteData);

router.post('/user/signup', getUser.userSignup);
router.post('/user/signin', getUser.userSignin);
router.get('/user/search/:name', userAuth.userAuthentication, getUser.searchProduct);
router.get('/usersort/product', userAuth.userAuthentication, getUser.sortProduct);
router.post('/user/addtocart', userAuth.userAuthentication, getUser.userCart);
router.get('/searchcartdata/:UserID', userAuth.userAuthentication, getUser.searchCartData);

module.exports = router;