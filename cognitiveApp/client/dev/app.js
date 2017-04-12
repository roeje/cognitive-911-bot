;(function(ng) {
  'use strict';

  ng.module('cognitiveApp', ['ngResource', 'ngRoute', 'ngMessages', 'underscore'])

     .filter("trust", ['$sce', function($sce) {
       return function(htmlCode){
       return $sce.trustAsHtml(htmlCode);
   }}]);


}(window.angular));
