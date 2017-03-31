;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('HomeController', function($scope, $rootScope, MainService, AuthService, $http, $window, _) {

         $scope.userInfo = AuthService.getUserInfo();         

      });
}(window.angular));
