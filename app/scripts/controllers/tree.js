'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:TreeCtrl
 * @description
 * # TreeCtrl
 * Controller of the angularAppApp
 */
angular.module('angularAppApp')
  .controller('TreeController', ['$scope', function ($scope) {
    this.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
    ];

    $scope.title ="Stevenson Tree";
  }]);
