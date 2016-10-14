var app = require('../server')
var db = app.get('db')

var imdb = require('imdb-api');

module.exports = {
  getAllMovies: function(req, res){
    db.get_all_movies(function(err, movies){
      if (err) {
        res.status(402).json(err)
      }else{
        res.status(200).json(movies)
      }
    })
  },
  createMovie: function(req, res){
    db.create_movie([req.body.unit, req.body.show_id, req.body.show_title, req.body.release_year,
      req.body.rating, req.body.category, req.body.show_cast, req.body.director, req.body.summary,
      req.body.poster, req.body.mediatype, req.body.runtime],function(err, movies){
      if (err) {
        res.status(402).json('something went wrong')
      }else{
        res.status(200).json('ok')
      }
    })
  }
}
