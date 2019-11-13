const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const User = db.User
const imgur = require('imgur-node-api')
const imgur_client_id = '0ced2f1200a3b8c'

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup')
  },

  signUp: (req, res) => {
    // confirm password
    if (req.body.passwordCheck !== req.body.password) {
      req.flash('error_messages', '兩次密碼輸入不同！')
      return res.redirect('signup')
    } else {
      User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
          req.flash('error_messages', '信箱重複！')
          res.redirect('signup')
        } else {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
          }).then(user => {
            req.flash('success_messages', '成功註冊帳號！')
            return res.redirect('/signin')
          })
        }
      })
    }
  },

  signInPage: (req, res) => {
    return res.render('signin')
  },

  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    res.redirect('/signin')
  },

  getUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      console.log('this is ' + user.name)
      //console.log(user)
      return res.render('user', { user: user })
    })
  },

  editUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      return res.render('editUser', { user: user })
    })
  },

  putUser: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      if (user.name !== req.body.name) {
        //console.log(req.body.name)
        user.update({
          name: req.body.name
        }).then(user => {
          console.log('user has already updated')
          req.flash('success_messages', `${user.name} successfully updated!`)
          res.redirect(`/users/${user.id}`)
        })
      } else {
        res.redirect('back')
      }
    })
  }
}

module.exports = userController