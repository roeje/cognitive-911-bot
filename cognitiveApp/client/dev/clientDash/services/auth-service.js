;(function(ng) {
  'use strict';

   ng.module('cognitiveApp')

   	.factory('AuthService', function($http, $cacheFactory, $q, $window, _) {
         var userInfo;

         function getUserInfo() {
            return userInfo;
         }

         function login(userName, password) {
            var deferred = $q.defer();

            $http.post("/api/login", {
               userName: userName,
               password: password
            }).then(function(result) {
               userInfo = {
                  accessToken: result.data.access_token,
                  userName: result.data.userName
               };
               $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
               deferred.resolve(userInfo);
            }, function(error) {
               deferred.reject(error);
            });

            return deferred.promise;
         }

         return {
            login: login
         };

         function init() {
            if ($window.sessionStorage["userInfo"]) {
               userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
         }
         init();

         function logout() {
            var deferred = $q.defer();

            $http.post("/api/logout", {
               headers: {
                  "access_token": userInfo.accessToken
               }
            }).then(function(result) {
               $window.sessionStorage["userInfo"] = null;
               userInfo = null;
               deferred.resolve(result);
            }, function(error) {
               deferred.reject(error);
            });

            return deferred.promise;
         }

   	});

}(window.angular));
