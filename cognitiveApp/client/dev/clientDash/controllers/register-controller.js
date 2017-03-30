;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('RegisterController', function($scope, $rootScope, MainService, AuthService, $http, $window, _, $location) {

         $scope.userInfo = AuthService.getUserInfo();
         $scope.username;
         $scope.password;
         $scope.password2;
         $scope.validPass = false;
         $scope.validLogin = false;

         $scope.register = function() {
            console.log("Registering User: " + $scope.username);
            if ($scope.password == $scope.password2) {
               AuthService.register($scope.username, $scope.password).then(function(results) {
                  console.log(results);
                  if(!results.accessToken) {
                     $scope.validLogin = true;
                  } else {
                     $scope.validLogin = false;
                     $location.url('/queue');
                  }
               });
            } else {
               $scope.validPass = true;
            }

         }

      });
}(window.angular));
