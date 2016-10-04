angular.module('app', ['ui-router'])
.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/');
$stateProvider
.state('./signup', {
  url: "/",
  templateUrl: "../views/signUp.html"
});
});
