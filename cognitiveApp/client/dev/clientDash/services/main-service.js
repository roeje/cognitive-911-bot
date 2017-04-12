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
               $http.get('/api/call-detail/' + id).success(function(data) {
                  deferred.resolve(data);
               });
               return deferred.promise;
            },

            getCallDetailGroup : function(id) {
               var deferred = $q.defer();
               $http.get('/api/call-group/' + id).success(function(data) {
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
            },

            getActiveCallGroups : function() {
               var deferred = $q.defer();
   				$http.get('/api/active-call-groups').success(function(data) {
   					deferred.resolve(data);
   				});
   				return deferred.promise;
            },

            getCallsByNumber : function(number) {
               var deferred = $q.defer();
   				$http.get('/api/calls-by-number/' + number).success(function(data) {
   					deferred.resolve(data);
   				});
   				return deferred.promise;
            },

            getClosedCalls : function() {
               var deferred = $q.defer();
   				$http.get('/api/closed-calls').success(function(data) {
   					deferred.resolve(data);
   				});
   				return deferred.promise;
            },

            deleteCallDetail : function(id) {
               var deferred = $q.defer();
               $http.delete('/api/call-detail/' + id).success(function(data) {
                  console.log(data);
                  deferred.resolve(data);
               });
               return deferred.promise;
            },

            closeCallDetail : function(id) {
               var deferred = $q.defer();
               $http.delete('/api/close-call/' + id).success(function(data) {
                  console.log('Call Closed');
                  console.log(data);
                  deferred.resolve(data);
               });
               return deferred.promise;
            }
   		}
   	});

}(window.angular));
