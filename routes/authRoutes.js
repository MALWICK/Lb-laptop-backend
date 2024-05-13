const express = require('express');
const  UserController  = require('../controller/UserController');
const midlewareAuth= require('../middlewares/authentication');
const router = express.Router();

router.post("/register", UserController.NewUser);

router.post("/login", UserController.LoginUser);

router.get('/logout',midlewareAuth.Auth, UserController.Logout)


module.exports = router;