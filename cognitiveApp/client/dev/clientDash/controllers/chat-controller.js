;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('ChatController', function($scope, $rootScope, MainService, AuthService, $http, $window, _) {

         $scope.userInfo = AuthService.getUserInfo();
         $scope.testString = "Messenger Link";

      });
}(window.angular));
