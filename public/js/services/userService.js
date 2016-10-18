angular.module('app')
.service('userService', function($http) {
  // this.loginLocal = function(data) {
  //   return $http({
  //     method: "POST",
  //     url: '/register',
  //     data: data
  //   })
  //   .then(function(res) {
  //     return res.data;
  //   })
  //   .catch(function(err) {
  //     console.log('ERROR LOGGING IN!', err);
  //   });
  // };
  //
  // this.getUser = function() {
  //   return $http({
  //     method: 'GET',
  //     url: '/login'
  //   })
  //   .then(function(res) {
  //     return res.data;
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });
  // };
  //
  // this.logout = function() {
  //   return $http({
  //     method: 'POST',
  //     url: '/logout'
  //   })
  //   .then(function(res) {
  //     return res.data;
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });
  // };
});
