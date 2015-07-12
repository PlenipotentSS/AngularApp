'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the angularAppApp
 */
angular.module('angularAppApp')
  .controller('ContactCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.items = [
      {
        name: "david",
        title: "pm",
        likes: 0
      },
      {
        name: "caitlin",
        title: "protector",
        likes: 0
      },
      {
        name: "leah",
        title: "antagonist",
        likes: 0
      }
    ];

    $scope.title ="Contact!";

  });
