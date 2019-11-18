const categoryService = require('../../services/categoryServices.js')

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.json({ data })
    })
  }
}

module.exports = categoryController