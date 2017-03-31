;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('LoginController', function($scope, $rootScope, MainService, AuthService, $http, $window, _, $location) {

         $scope.userInfo = AuthService.getUserInfo();
         $scope.username;
         $scope.password;
         $scope.validLogin = false;

         $scope.login = function() {
            console.log("Logging in User: " + $scope.username);
            AuthService.login($scope.username, $scope.password).then(function(results) {
               if(!results) {
                  $scope.validLogin = true;
               } else {
                  $scope.validLogin = false;
                  $location.url('/queue');
               }
            });
         }
      });
}(window.angular));
