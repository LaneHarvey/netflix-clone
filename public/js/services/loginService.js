
angular.module("app").service("loginService", function($http) {

this.userSignUp = function(){
    return $http({
        method:"POST",
        url:"auth/login"
    }).then(function(response){
        return response
    })
},
this.getCurrentUser = function(){
    return $http({
        method:"GET",
        url:"/api/me"
    }).then(function(response) {
      return response;
    })
}

});
