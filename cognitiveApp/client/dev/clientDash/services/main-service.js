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
   				$http.get('/scheduling/get-services-for-week' + startWeek).success(function(data) {
   					deferred.resolve(data);
   				});
   				return deferred.promise;
   			},

            getCallDetail : function(id) {
               var deferred = $q.defer();
               $http.get('/api/call-details/1').success(function(data) {
                  deferred.resolve(data);
               });
               return deferred.promise;
            },

            getActiveCalls : function() {
               var deferred = $q.defer();
   				$http.get('/api/active-calls').success(function(data) {
   					deferred.resolve(data);
   				});
   				return deferred.promise;
            }
   		}
   	});

}(window.angular));
