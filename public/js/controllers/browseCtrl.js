angular.module('app').controller("browseCtrl", function($scope, $http, $state, movieService){

  $scope.goToMe = function(){
    $state.go('me')
  }
  $scope.searchMovie = function(name){
      movieService.search(name).then(function( res ){
        console.log(res);
        $scope.movieName = ""
        $scope.movie = res.data
      })
  }

  $http.get('http://localhost:8080/api/movies').success(function(pdata) {
                    $scope.data = pdata;
        });

  $scope.posterArt = function(movies){
    movieService.getMovies(movies).then(function(res){
      console.log(res);
      $scope.posters = res.data
    })
  }
})
