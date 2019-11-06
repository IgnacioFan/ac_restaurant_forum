let adminController = {
  getRestaurants: (req, res) => {
    return res.render('admin/restaurants')
    //return res.end("Hiii")
  }
}

module.exports = adminController