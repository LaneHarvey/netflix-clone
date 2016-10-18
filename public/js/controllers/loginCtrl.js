angular.module('app').controller('loginCtrl', function($scope, loginService, $auth, $state) {

  $scope.login = function(user){
       $auth.login(user).then(function(res){

           $state.go('browse')


       });
   }

   $scope.signUp = function(user) {
      $auth.signup(user).then(function(response) {
           $auth.setToken(response.data.token);
       console.log("signed up")
       $state.go('browse')

     });
  }




})
