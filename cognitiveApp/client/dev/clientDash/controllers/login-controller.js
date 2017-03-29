;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('LoginController', function($scope, $rootScope, MainService, AuthService, $http, $window, _) {
         $scope.username;
         $scope.password;

         $scope.login = function() {
            console.log("Logging in User: " + $scope.username);
            AuthService.login(username, password).then(function(results) {
               console.log(results);
            });
         }

         $scope.logout = function() {
            AuthService.logout().then(function(results) {
               console.log(results);
            });
         }

      });
}(window.angular));
