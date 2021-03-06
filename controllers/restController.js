const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User
const pageLimit = 10


let restController = {
  getRestaurants: (req, res) => {
    let whereQuery = {}
    let categoryId = ""
    let offset = 0

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      // convert id from string into integer
      categoryId = Number(req.query.categoryId)
      whereQuery['categoryId'] = categoryId
    }

    return Restaurant.findAndCountAll({
      include: Category, where: whereQuery,
      offset: offset, limit: pageLimit
    }).then(result => {
      let page = Number(req.query.page) || 1
      // the maximum of the page
      let pages = Math.ceil(result.count / pageLimit)
      let totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
      let prev = page - 1 < 1 ? 1 : page - 1
      let next = page + 1 > pages ? pages : page + 1

      const data = result.rows.map(r => ({
        ...r.dataValues,
        description: r.dataValues.description.substring(0, 50),
        isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.id),
        isLiked: req.user.LikedRestaurants.map(d => d.id).includes(r.id)
      }))
      // get all categories data
      Category.findAll().then(categories => {
        return res.render('restaurants', {
          restaurants: data,
          categories: categories,
          page: page,
          totalPage: totalPage,
          prev: prev,
          next: next,
          categoryId: categoryId
        })
      })

    })
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [Category,
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' },
        { model: Comment, include: [User] }]
    }).then(restaurant => {
      const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
      const isLiked = restaurant.LikedUsers.map(d => d.id).includes(req.user.id)
      //console.log(restaurant)
      restaurant.update({ viewCounts: restaurant.viewCounts + 1 })
      return res.render('restaurant', { restaurant: restaurant, isFavorited: isFavorited, isLiked: isLiked })
    })
  },

  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10, order: [['createdAt', 'DESC']],
      include: [Category]
    }).then(restaurants => {
      Comment.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      }).then(comments => {
        return res.render('feeds', { restaurants: restaurants, comments: comments })
      })
    })
  },

  getTop10: (req, res) => {
    return Restaurant.findAll({
      include: [{ model: User, as: 'FavoritedUsers' }]
    }).then(restaurants => {
      restaurants = restaurants.map(restaurant => (
        {
          ...restaurant.dataValues,
          description: restaurant.description.substring(0, 50),
          FavoriteCount: restaurant.FavoritedUsers.length,
          isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(restaurant.id)
        }
      ))
      restaurants.sort((a, b) => b.FavoriteCount - a.FavoriteCount)
      //console.log(restaurants)
      return res.render('top10', { restaurants: restaurants.slice(0, 10) })
    })
  },

  getDashboard: (req, res) => {
    return Restaurant.findByPk(req.params.id, { include: [Category] }).then(restaurant => {
      Comment.findAndCountAll({ where: { RestaurantId: restaurant.id } }).then(comments => {
        return res.render('dashboard', { restaurant: restaurant, comments: comments })
      })
    })
  }
}

module.exports = restController