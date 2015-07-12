'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the angularAppApp
 */
angular.module('angularAppApp')
  .controller('GameController', ['$scope', '$crafty', function ($scope, $crafty) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var base_speed = .25;

    Crafty.init(window.innerWidth-45,window.innerHeight, document.getElementById('game'));

    Crafty.e('Floor, 2D, Canvas, Color, table')
      .attr({x: 0, y: 250, w: 250, h: 10})
      .color('#F00')

    Crafty.e('Floor, 2D, Canvas, Color, table')
      .attr({x: 150, y: 450, w: 250, h: 10})
      .color('#F00');

    Crafty.e('Floor, 2D, Canvas, Color, table')
      .attr({x: 0, y: 600, w: 900, h: 10})
      .color('#F00');

    for (var i=1; i<50; i++) {
      Crafty.e('2D, Canvas, player, Color, Fourway, Gravity, Collision')
        .attr({x: 0, y: 0, w: 50, h: 50})
        .color('green')
        .fourway(base_speed*i)
        .gravity('Floor')
        .collision();
    }
    
  }]);