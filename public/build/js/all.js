angular.module('app', ['ui-router'])
.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/');
$stateProvider
.state('./signup', {
  url: "/",
  templateUrl: "../views/signUp.html"
});
});


angular.module('app').controller('loginCtrl', function($scope) {

  $scope.test = "working";

})

