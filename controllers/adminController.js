const fs = require('fs')
const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category


const adminService = require('../services/adminServices')

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })
  },

  createRestaurant: (req, res) => {
    Category.findAll().then(categories => {
      return res.render('admin/create', { categories: categories })
    })
  },

  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (result) => {
      if (result['status'] === 'error') {
        req.flash('error_messages', result['message'])
        return res.redirect('back')
      }

      req.flash('success_messages', result['message'])
      return res.redirect('/admin/restaurants')

    })
  },

  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.render('admin/restaurant', data)
    })
  },

  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      Category.findAll().then(categories => {
        return res.render('admin/create', {
          categories: categories,
          restaurant: restaurant
        })
      })
    })
  },

  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data["status"] === "error") {
        req.flash('error_message', data["message"])
        return res.redirect('back')
      }
      req.flash('success_message', data["message"])
      return res.redirect('/admin/restaurants')
    })
  },

  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },

  getUsers: (req, res) => {
    return User.findAll().then(users => {
      return res.render('admin/users', { users: users })
    })
  },

  putUsers: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      //console.log('AAAAAA')
      user.update({ isAdmin: !user.isAdmin })
        .then(user => {
          req.flash('success_messages', `${user.name} was successfully to update!`)
          res.redirect('/admin/users')
        })

    })
  }

}

module.exports = adminController