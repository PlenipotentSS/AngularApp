'use strict';

/**
 * @ngdoc overview
 * @name angularAppApp
 * @description
 * # angularAppApp
 *
 * Main module of the application.
 */
angular
  .module('angularAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-capitalize-filter'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/detail.html',
        controller: 'AboutController',
        controllerAs: 'about'
      })
      .when('/crafty', {
        templateUrl: 'views/crafty.html',
        controller: 'GameController',
        controllerAs: 'game'
      })
      .when('/shifty', {
        templateUrl: 'views/shifty.html',
        controller: 'ShiftyController',
        controllerAs: 'shifty'
      })
      .when('/contact', {
        templateUrl: 'views/detail.html',
        controller: 'ContactController',
        controllerAs: 'contact'
      })
      .when('/styles/main.css', {
        templateUrl: 'views/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

//crafty angular factory
angular.module('angularAppApp')
  .factory('$crafty', function ($window) {
    var crafty = $window.Crafty || {};

    // patch broken Crafty.stop(true)
    crafty.shutdown = function () {
      crafty.stop();

      // manual stop(true);
      crafty.audio.remove();

      // Throw out any old objects
      crafty.viewport.reset();
      crafty('2D').each(function () {
        if (!this.has('Persist')) {
          this.destroy();
        }
      });

      angular.element(crafty.stage.elem).addClass('hide');
    };

    // patch reasonable initialization function
    crafty.startup = function (w,h) {
      crafty.init(w,h);
      angular.element(crafty.stage.elem).removeClass('hide');
    };

    return crafty;
  });

//shifty angular factory
angular.module('angularAppApp')
  .factory('$shifty', function ($window) {
    var tweenable = $window.Tweenable || {};

    return tweenable;
  });