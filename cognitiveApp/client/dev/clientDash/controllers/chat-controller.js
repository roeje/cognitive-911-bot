;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('ChatController', function($scope, $rootScope, MainService, $http, $window, _) {

         $scope.testString = "Messenger Link";

      });
}(window.angular));
