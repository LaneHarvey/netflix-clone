angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/');
$stateProvider
    .state('home', {
      url: '/',
      controller: 'browseCtrl',
      templateUrl: '../views/home.html'
    })
    .state('browse', {
      url: '/browse',
      controller: 'browseCtrl',
      templateUrl: '../views/browse.html'
    })
    .state('login', {
      url: '/login',
      controller: 'loginCtrl',
      templateUrl: '../views/login.html'
    })
    .state('new', {
      url: '/new',
      // controller: 'loginCtrl',
      templateUrl: '../views/new.html'
    });
  });

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

angular.module('app').controller('homeCtrl', function($scope, $state) {

  // 
  // function getUser() {
  //   userService.getUser().then(function(user) {
  //     if (user) $scope.user = user.username;
  //     else   $scope.user = 'NOT LOGGED IN';
  //   });
  // }
  //
  // getUser();
  //
  // $scope.loginLocal = function(username, password) {
  //   console.log('Logging in with', username, password);
  //   userService.loginLocal({
  //     username: username,
  //     password: password
  //   })
  //   .then(function(res) {
  //     getUser();
  //   });
  // };
  //
  // $scope.logout = userService.logout;


});

angular.module('app').controller('loginCtrl', function($scope) {

  $scope.test = "working";

})

angular.module('app').controller('profileCtrl', function($scope) {

  $scope.test = "working";

})

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

// angular.module('app')
// .service('userService', function($http) {
//   this.loginLocal = function(credentials) {
//     return $http({
//       method: "POST",
//       url: '/auth/local',
//       data: credentials
//     })
//     .then(function(res) {
//       return res.data;
//     })
//     .catch(function(err) {
//       console.log('ERROR LOGGING IN!', err);
//     });
//   };
//
//   this.getUser = function() {
//     return $http({
//       method: 'GET',
//       url: '/auth/me'
//     })
//     .then(function(res) {
//       return res.data;
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
//   };
//
//   this.logout = function() {
//     return $http({
//       method: 'GET',
//       url: '/auth/logout'
//     })
//     .then(function(res) {
//       return res.data;
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
//   };
// });
