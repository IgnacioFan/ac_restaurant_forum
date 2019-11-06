let restController = {
  getRestaurants: (req, res) => {
    return res.render('restaurants')
    //return res.end("Hiii")
  }
}

module.exports = restController