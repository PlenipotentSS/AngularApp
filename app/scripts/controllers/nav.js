'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the angularAppApp
 */
angular.module('angularAppApp')
  .controller('NavCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isActive = function (viewLocation) {
         var active = (viewLocation === $location.url());
         return active;
    };
  });
