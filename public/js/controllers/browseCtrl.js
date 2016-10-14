angular.module('app').controller("browseCtrl", function($scope, $state, movieService){

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
  $scope.movieResult = function(){
      movieService.getallMovies().then(function( res ){
        console.log(res);
        $scope.result = res.data
        $scope.movie = res.data

      })
  }


})
