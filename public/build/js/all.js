angular.module('app', ['ui-router'])
.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/');
$stateProvider
    .state('home', {
      url: '/',
      controller: 'controllers/',
      templateUrl: './views/home.html'
    });
});


angular.module('app')
.controller('homeController', function($scope, userService, $state) {


  function getUser() {
    userService.getUser().then(function(user) {
      if (user) $scope.user = user.username;
      else   $scope.user = 'NOT LOGGED IN';
    });
  }

  getUser();

  $scope.loginLocal = function(username, password) {
    console.log('Logging in with', username, password);
    userService.loginLocal({
      username: username,
      password: password
    })
    .then(function(res) {
      getUser();
    });
  };

  $scope.logout = userService.logout;


});

angular.module('app').controller('loginCtrl', function($scope) {

  $scope.test = "working";

})


angular.module('app')
.service('userService', function($http) {
  this.loginLocal = function(credentials) {
    return $http({
      method: "POST",
      url: '/auth/local',
      data: credentials
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log('ERROR LOGGING IN!', err);
    });
  };

  this.getUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/me'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  this.logout = function() {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    })
    .then(function(res) {
      return res.data;
    })
    .catch(function(err) {
      console.log(err);
    });
  };
});
