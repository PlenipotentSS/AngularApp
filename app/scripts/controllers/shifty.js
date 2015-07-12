'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:ShiftyController
 * @description
 * # ShiftyController
 * Controller of the angularAppApp
 */
angular.module('angularAppApp')
  .controller('ShiftyController', ["$scope", "$shifty", function ($scope, Tweenable) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var TA = []; // Array of tweenables;
    var TP = []; // Current state;
    var TE = []; // Elements;

    for (var i=1; i<=20; i++) {
      TE[i] = document.getElementById('fig' + i.toString());
      TA[i] = new Tweenable();
      TA[i].setConfig({     

        // We attach (and thus, cache) the corresponding DOM element for each Tweenable insance;
        attachment : [i, TE[i]],

        from : {
          'x' : 0,
          'y' : 0,
          'rot' : 0,
          'scale' : 1.0,
          'backgroundColor' : '#ff0000'
        },        

        to : {
          'x' : 320 * Math.random() - 160,
          'y' : 480* Math.random() - 240,
          'rot' : Math.random() * 360,
          'scale' : Math.random() * 4.5 + 0.5,
          'backgroundColor' : '#ffff00'
        },        

        duration : (2000 * Math.random() + 500),        

        step : function(currentState, currentAttachment) {       
          if (!currentAttachment) 
            return;                               
          TP[currentAttachment[0]] = currentState;                        
        },        

        easing : 'bounce'

      });
    }

    for (var i=1; i<=20; i++) {
      TA[i].tween();
    }

    setInterval(function(){
      for (var i=1; i<=20; i++) {
        var ce = TE[i];
        var cp = TP[i];
        ce.style.transform = 
        ce.style.msTransform = 
        ce.style.mozTransform = 
        ce.style.webkitTransform = 
          'translate(' + cp.x + 'px, ' + cp.y + 'px) scale(' + cp.scale + ') rotate(' + cp.rot + 'deg)';
        ce.style.backgroundColor = cp.backgroundColor;  
      }
    }, 1000/60);
  }]);
