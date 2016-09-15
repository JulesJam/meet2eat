var request = require('request-promise');

function cuisines(req, res) {
  request.get({
    url: 'https://developers.zomato.com/api/v2.1/cuisines',
    headers: { 'user-key': process.env.ZOMATO_API_KEY },
    qs: {
      lat: req.query.lat, 
      lon: req.query.lng ,
    },
    json: true
  })
  .then(function(results) {
    results = results.cuisines.map(function(cuisine) {
      return {
        id: cuisine.cuisine.cuisine_id,
        name: cuisine.cuisine.cuisine_name
      }
    });
    res.status(200).json(results);
  })
  .catch(function(err) {
    res.status(err.error.code).json(err.error.message);
  });

}

function restaurants(req, res) {
  request.get({
    url: 'https://developers.zomato.com/api/v2.1/search',
    headers: { 'user-key': process.env.ZOMATO_API_KEY },
    qs: {
      lat: req.query.lat, 
      lon: req.query.lng ,
    },
    json: true
  })
  .then(function(results) {
    results = results.restaurants.map(function(cuisine) {
      console.log (resturants.restaurant.name);
      return {
        id: cuisine.cuisine.cuisine_id,
        name: cuisine.cuisine.cuisine_name
      }
    });
    res.status(200).json(results);
  })
  .catch(function(err) {
    res.status(err.error.code).json(err.error.message);
  });
}

module.exports = {
  cuisines: cuisines
}