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
  },

  deleteCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id).then(category => {
      category.destroy().then(category => {
        callback({ status: "success", message: `${category.name} was successfully deleted` })
      })
    })
  },

  putCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id).then(category => {
      category.update({
        name: req.body.name
      }).then(category => {
        callback({ status: "success", message: `${category.name} was successfully updated` })
      })
    })
  },
}

module.exports = categoryService