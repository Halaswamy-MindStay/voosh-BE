const { userLogin, userSignUp, googleLogin, usersData } = require('../controllers/userController');

const route = require('express').Router()

route.post('/login', userLogin)
route.post('/signUp', userSignUp)
route.post('/googlelogin', googleLogin)
route.get('/users', usersData)

module.exports = route;