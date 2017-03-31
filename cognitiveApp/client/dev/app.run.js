;(function(ng) {
  'use strict';

   ng.module('cognitiveApp')
      .run(["$rootScope", "$location", function($rootScope, $location) {
         $rootScope.$on("$routeChangeSuccess", function(userInfo) {
            console.log(userInfo);
         });

         $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
               $location.url("/login");
            }
         });
      }]);
}(window.angular));
