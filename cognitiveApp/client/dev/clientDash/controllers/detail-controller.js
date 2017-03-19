;(function(ng) {
  'use strict';
   ng.module('cognitiveApp')

      .controller('DetailController', function($scope, $rootScope, MainService, $http, $window, _, $routeParams) {

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
         }, function(data) {
            console.log("No data loaded for class details");
            $scope.callDetail = "None";
         });
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
