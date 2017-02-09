;(function(ng) {
  'use strict';

  ng.module('cognitiveApp')
    .config([
      '$locationProvider',
      function($locationProvider) {

        $locationProvider.html5Mode(true);

      }
    ]);
}(window.angular));
