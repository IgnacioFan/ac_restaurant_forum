const db = require('../models')
const Category = db.Category

const categoryController = {

  getCategories: (req, res) => {
    return Category.findAll().then(categories => {
      return res.render('admin/categories', { categories: categories })
    })
  },

  postCategory: (req, res) => {
    return Category.create({
      name: req.body.name
    }).then((category) => {
      req.flash('success_messages', 'category was successfully created')
      res.redirect('/admin/categories')
    })
  },

  getCategory: (req, res) => {
    return Category.findByPk(req.params.id).then(category => {
      Category.findAll().then(categories => {
        return res.render('admin/categories', {
          categories: categories,
          category: category
        })
      })
    })
  },

  putCategory: (req, res) => {
    return Category.findByPk(req.params.id).then(category => {
      category.update({
        name: req.body.name
      }).then(category => {
        req.flash('success_messages', `${category.name} was successfully updated`)
        res.redirect('/admin/categories')
      })
    })
  },

  deleteCategory: (req, res) => {
    return Category.findByPk(req.params.id).then(category => {
      category.destroy().then(category => {
        req.flash('success_messages', `${category.name} was successfully deleted`)
        res.redirect('/admin/categories')
      })
    })
  }
}

module.exports = categoryController