angular.module('app', ['ui-router'])
.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/');
$stateProvider
    .state('home', {
      url: '/',
      controller: 'homeCtrl',
      templateUrl: '../views/home.html'
    });
});
