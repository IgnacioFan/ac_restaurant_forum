const db = require('../models')
const Category = db.Category

const categoryService = require('../services/categoryServices')

const categoryController = {

  getCategories: (req, res) => {
    categoryService.getCategories(res, res, (data) => {
      return res.render('admin/categories', data)
    })
  },

  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
      if (data["status"] === "error") {
        req.flash('error_messages', data["message"])
        return res.redirect('back')
      }
      req.flash('success_messages', data["message"])
      return res.redirect('/admin/categories')
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