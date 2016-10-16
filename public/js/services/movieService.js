angular.module("app").service("movieService", function($http){
    this.search = function(name){
      return $http({
        method: 'GET',
        url: "http://netflixroulette.net/api/api.php?title=" + name
      })
    }
    this.getMovies = function(){
      return $http({
        method: 'GET',
        url: "http://localhost:8080/api/movies"
      })
    }
    this.postMovie = function(movie){
      return $http({
        method: 'POST',
        url: 'http://localhost:8080/api/movie',
        data:movies
      })
    }
})
