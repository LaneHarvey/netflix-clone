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
    .state('profiles', {
      url: '/profiles',
      // controller: 'loginCtrl',
      templateUrl: '../views/profile.html'
    });
  });
