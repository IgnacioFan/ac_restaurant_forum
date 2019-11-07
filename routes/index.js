const restController = require('../controllers/restController.js')
const userController = require('../controllers/userController.js')
const adminController = require('../controllers/adminController.js')

module.exports = app => {
  app.get('/', (req, res) => res.redirect('restaurants'))
  app.get('/restaurants', restController.getRestaurants)
  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/admin', (req, res) => res.redirect('admin/restaurants'))
  app.get('/admin/restaurants', adminController.getRestaurants)
}