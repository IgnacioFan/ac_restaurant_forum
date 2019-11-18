const db = require('../models')
const Category = db.Category

const categoryService = {
  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => {
      callback({ categories: categories })
    })
  }
}

module.exports = categoryService