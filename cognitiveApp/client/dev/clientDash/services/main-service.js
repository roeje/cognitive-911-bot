;(function(ng) {
  'use strict';

   ng.module('cognitiveApp')

   	.factory('MainService', function($http, $cacheFactory, $q, $window, _) {

   		function getBaseUrl() {
   			if ($window.baseUrl == 'http://localhost')
   				return 'http://localhost:8000';
   			return $window.baseUrl;
   		}
   		return {

   			getServices : function(startWeek) {
   				var deferred = $q.defer();
   				$http.get(getBaseUrl() + '/scheduling/get-services-for-week/' + startWeek).success(function(data) {
   					deferred.resolve(data);
   				});
   				return deferred.promise;
   			}
   		}
   	});

}(window.angular));
