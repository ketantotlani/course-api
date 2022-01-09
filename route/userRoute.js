const route = require('express').Router()
const userCtrl = require('../controller/userCtrl');
const auth = require('../middleware/auth')

route.post('/register', userCtrl.register)
route.post('/login', userCtrl.login)
route.get('/logout', userCtrl.logOut)

route.get('/reqToken', userCtrl.reqToken)
route.get('/userinfo',auth, userCtrl.getUser)


module.exports = route;