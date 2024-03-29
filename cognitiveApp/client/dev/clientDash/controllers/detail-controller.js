;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('DetailController', function($scope, $rootScope, MainService, AuthService, $http, $window, $location, _, $routeParams) {
         $scope.userInfo = AuthService.getUserInfo();

         $scope.testString = "Hello World";
         $scope.callDetalTestString;
         var id  = $routeParams.id;
         $scope.detailsList = [
          {detailType:"phoneNum", detailLabel:"Phone Number", detailContent:"616-555-5134"},
               {detailType:"emergencyType", detailLabel:"Emergency Type", detailContent:"Heart Attack"},
               {detailType:"location", detailLabel:"Emergency Location", detailContent:"111 Oak Street, Grand Rapids, MI"},
               {detailType:"numInjuries", detailLabel:"Number Of Injuries", detailContent:"Zero"},
            ];

         MainService.getCallDetail(id).then(function(data) {
            console.log(data);
            $scope.callDetail = data;
            MainService.getCallsByNumber($scope.callDetail.dialogAction.slots.Phone).then(function(data) {
               console.log("Previous Calls");
               console.log(data);
               $scope.callPreviousCalls = data;
            }, function(data) {
               console.log("No data loaded for previous calls");
               $scope.callDetailGroup = "None";
            });
         }, function(data) {
            console.log("No data loaded for class details");
            $scope.callDetail = "None";
         });

         MainService.getCallDetailGroup(id).then(function(data) {
            console.log("Call Group");
            console.log(data);
            $scope.callDetailGroup = data;
         }, function(data) {
            console.log("No data loaded for call group");
            $scope.callDetailGroup = "None";
         });

         $scope.openDetails = function (callerId) {
            $location.url('/detail/' + callerId);
         };

         $scope.closeCall = function(callerId) {
            MainService.closeCallDetail(callerId);
            $location.url('/queue');
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
