;(function(ng) {
  'use strict';

  ng.module('cognitiveApp')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
         .when('/', {
            templateUrl: 'clientDash/templates/home-page.html'
         })
         .when('/detail', {
           templateUrl: 'clientDash/templates/callDetails.html',
           controller: 'DetailController',
           controllerAs: 'detailCtrl'
         })
         .when('/queue', {
           templateUrl: 'clientDash/templates/callQueue.html',
           controller: 'QueueController',
           controllerAs: 'queueCtrl'
         })
         .otherwise({
            redirectTo: '/'
         });
      }
    ]);
}(window.angular));
