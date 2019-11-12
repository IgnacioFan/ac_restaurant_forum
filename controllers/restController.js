const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

let restController = {
  getRestaurants: (req, res) => {
    let whereQuery = {}
    let categoryId = ""
    if (req.query.categoryId) {
      // convert id from string into integer
      categoryId = Number(req.query.categoryId)
      whereQuery['categoryId'] = categoryId
    }

    return Restaurant.findAll({ include: Category, where: whereQuery }).then(restaurants => {
      const data = restaurants.map(r => ({
        ...r.dataValues,
        description: r.dataValues.description.substring(0, 50)
      }))
      // get all categories data
      Category.findAll().then(categories => {
        return res.render('restaurants', {
          restaurants: data,
          categories: categories,
          categoryId: categoryId
        })
      })

    })
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(restaurant => {
      console.log(restaurant)
      return res.render('restaurant', { restaurant: restaurant })
    })
  }
}

module.exports = restController