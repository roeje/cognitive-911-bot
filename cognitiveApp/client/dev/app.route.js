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
         .when('/detail/:id', {
           templateUrl: 'clientDash/templates/callDetails.html',
           controller: 'DetailController',
           controllerAs: 'detailCtrl',
           resolve: {
             auth: ["$q", "AuthService", function($q, AuthService) {
               var userInfo = AuthService.getUserInfo();

               if (userInfo) {
                 return $q.when(userInfo);
               } else {
                 return $q.reject({ authenticated: false });
               }
             }]
           }
         })
         .when('/queue', {
           templateUrl: 'clientDash/templates/callQueue.html',
           controller: 'QueueController',
           controllerAs: 'queueCtrl',
           resolve: {
             auth: ["$q", "AuthService", function($q, AuthService) {
               var userInfo = AuthService.getUserInfo();

               if (userInfo) {
                 return $q.when(userInfo);
               } else {
                 return $q.reject({ authenticated: false });
               }
             }]
           }
         })
         .when('/chat', {
           templateUrl: 'clientDash/templates/chatBot.html',
           controller: 'ChatController',
           controllerAs: 'chatCtrl'
         })
         .when('/login', {
            templateUrl: 'lientDash/templates/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
         })
         .otherwise({
            redirectTo: '/'
         });
      }
    ]);
}(window.angular));
