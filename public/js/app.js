angular.module('app', ['ui-router'])
.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/');
$stateProvider
    .state('home', {
      url: '/',
      controller: 'controllers/homeCtrl',
      templateUrl: '../views/home.html'
    });
});
