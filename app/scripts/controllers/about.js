'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularAppApp
 */
angular.module('angularAppApp')
  .controller('AboutController', ['$scope', function ($scope) {
    this.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
    ];

    $scope.title ="About!";

    $scope.items = [
      {
        name: "jimmy hopkins",
        title: "nothing",
        likes: 0
      },
      {
        name: "steve",
        title: "developer",
        likes: 0
      },
      {
        name: "john",
        title: "manager",
        likes: 0
      }
    ];

    $scope.addIndex = function(index) {
      $scope.items[index].likes += 1;
    };
  }]);
