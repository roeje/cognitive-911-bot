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
               if (result.data == null) {
                  deferred.resolve(null);
               } else {
                  userInfo = {
                     accessToken: result.data[0].token,
                     userName: result.data[0].username
                  };
                  $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                  deferred.resolve(userInfo);
               }
            }, function(error) {
               deferred.reject(error);
            });

            return deferred.promise;
         }

         function register(userName, password) {
            var deferred = $q.defer();

            $http.post("/api/register", {
               userName: userName,
               password: password
            }).then(function(result) {
               userInfo = {
                  accessToken: result.data.token,
                  userName: result.data.username
               };
               $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
               deferred.resolve(userInfo);
            }, function(error) {
               deferred.reject(error);
            });

            return deferred.promise;
         }

         function init() {
            if ($window.sessionStorage["userInfo"]) {
               userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
         }
         init();

         function logout() {
            // var deferred = $q.defer();

            $window.sessionStorage["userInfo"] = null;
            userInfo = null;

            // $http.post("/api/logout", {
            //    headers: {
            //       "access_token": userInfo.token
            //    }
            // }).then(function(result) {
            //    $window.sessionStorage["userInfo"] = null;
            //    userInfo = null;
            //    deferred.resolve(result);
            // }, function(error) {
            //    deferred.reject(error);
            // });
            //
            // return deferred.promise;
         }

         // Make service functions visible to controllers
         return {
            login: login,
            logout: logout,
            getUserInfo: getUserInfo,
            register: register
         };

   	});

}(window.angular));
