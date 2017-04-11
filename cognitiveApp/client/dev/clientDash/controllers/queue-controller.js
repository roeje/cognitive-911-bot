;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('QueueController', function($scope, $rootScope, $location, MainService, AuthService, $http, $timeout, $interval, $window, _) {

         $scope.userInfo = AuthService.getUserInfo();
         $scope.testString = "Hello World";

         $scope.getCallData = function() {
            MainService.getActiveCalls().then(function(calls){
               console.log(calls);
               $scope.activeCalls = calls;

            }, function(data) {
         		console.log("No active calls");
         		$scope.activeCalls = [];
         	});
         }
         $scope.getCallData();

         $scope.getCallGroupData = function() {
            MainService.getActiveCallGroups().then(function(groups){
               console.log("Call Groups");
               console.log(groups);
               $scope.activeCallGroups = groups;

            }, function(data) {
         		console.log("No active call groups");
         		$scope.activeCallGroups = [];
         	});
         }
         $scope.getCallGroupData();

         $scope.getClosedCallData = function() {
            MainService.getClosedCalls().then(function(calls){
               console.log("Closed Calls");
               console.log(calls);
               $scope.closedCalls = calls;

            }, function(data) {
         		console.log("No closed calls");
         		$scope.closedCalls = [];
         	});
         }
         $scope.getClosedCallData();

         $interval(function() {
            $scope.getCallData();
            $scope.getCallGroupData();
            $scope.getClosedCallData();
         }, 50000);

         $scope.callerList = [
            {callerId:0, callStartTime:'15:37', callElapsedTime: '3 minutes', phoneNum:'616-555-5134 ', callerName:'Jane Doe',
               emergencyType:'Heart Attack', location:'111 Oak Street'},

            {callerId:1, callStartTime:'15:35', callElapsedTime: '5 minutes', phoneNum:'616-784-1354', callerName:'Billy Westing',
               emergencyType:'Car Accident', location:'681 Grand River Ave'},

            {callerId:2, callStartTime:'15:32', callElapsedTime: '8 minutes', phoneNum:'616-772-6418 ', callerName:'John Smith',
               emergencyType:'Fire', location:'111 Oak Street'},

            {callerId:3, callStartTime:'15:29', callElapsedTime: '11 minutes', phoneNum:'Jani', callerName:'Norman Easterling',
               emergencyType:'Car Accident', location:'111 Oak Street'},

            {callerId:4, callStartTime:'15:39', callElapsedTime: '1 minute', phoneNum:'Unknown', callerName:'Unknown',
               emergencyType:'Unknown', location:'Unknown'}
         ];

         $scope.openDetails = function (callerId) {
            $location.url('/detail/' + callerId);
         };

         $scope.deleteDetail = function(callerId) {
            MainService.deleteCallDetail(callerId);
            getCallData();
         }

      	// var moment = $window.moment;
      	// var updatedServiceList = [];
         //
      	// $scope.user = $window.user;
         //
      	// $scope.services = $window.nextServices;
      	// console.log("Services");
      	// console.log($scope.services);
      	// $scope.weekToLoad = 1;
         //
      	// $scope.defaultDropdownText = "Select Volunteer";
      	// $scope.communicationMethods = [];
         //
         //
      	// SchedulingService.getVolunteers().then(function(data) {
      	// 	console.log("SchedulingService - Loading Volunteers");
      	// 	console.log("Volunteers");
      	// 	console.log(data);
      	// 	$scope.volunteers = data;
      	// }, function(data) {
      	// 	console.log("No data loaded for volunteers");
      	// 	$scope.volunteers = [];
      	// });
         //
         //
      	// $scope.loadMoreDates = function() {
      	// 	SchedulingService.getServices($scope.weekToLoad).then(function(data) {
      	// 		angular.forEach(data, function(service) {
      	// 			$scope.services.push(service);
      	// 		});
      	// 	});
      	// 	$scope.weekToLoad++;
      	// }

      });
}(window.angular));
