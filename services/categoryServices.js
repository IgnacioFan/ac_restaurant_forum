const db = require('../models')
const Category = db.Category

const categoryService = {
  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => {
      callback({ categories: categories })
    })
  },

  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: "name did\'t exist" })
    } else {
      return Category.create({
        name: req.body.name
      }).then((category) => {
        callback({ status: 'success', message: "category was successfully created" })
      })
    }
  }
}

module.exports = categoryService