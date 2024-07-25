const { userLogin, userSignUp, googleLogin } = require('../controllers/userController');

const route = require('express').Router()

route.post('/login', userLogin)
route.post('/signUp', userSignUp)
route.post('/googlelogin', googleLogin)

module.exports = route;