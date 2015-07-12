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

    var scene;

    var Tweening = function() {
      var _this = this;
      this.TA = []; // Array of tweenables;
      this.TP = []; // Current state;
      this.TE = []; // Elements;
      this.interval;

      this.destroy = function() {
        if (_this.interval) {
          clearInterval(_this.interval);
        }
      }

      for (var i=1; i<=20; i++) {
        _this.TE[i] = document.getElementById('fig' + i.toString());
        _this.TA[i] = new Tweenable();
        _this.TA[i].setConfig({     

          // We attach (and thus, cache) the corresponding DOM element for each Tweenable insance;
          attachment : [i, _this.TE[i]],

          from : {
            'x' : 0,
            'y' : 0,
            'rot' : 0,
            'scale' : 1.0,
            'backgroundColor' : '#ff0000'
          },        

          to : {
            'x' : 320 * Math.random() - 160,
            'y' : 480 * Math.random() - 240,
            'rot' : Math.random() * 360,
            'scale' : Math.random() * 4.5 + 0.5,
            'backgroundColor' : '#ffff00'
          },        

          duration : (2000 * Math.random() + 500),        

          step : function(currentState, currentAttachment) {       
            if (!currentAttachment) {
              return;                
            }               
            _this.TP[currentAttachment[0]] = currentState;                        
          },        

          easing : 'bounce'

        });
      }

      for (var j=1; j<=20; j++) {
        _this.TA[j].tween();
      }

      _this.interval = setInterval(function(){
        for (var i=1; i<=20; i++) {
          var ce = _this.TE[i];
          var cp = _this.TP[i];
          ce.style.transform = 
          ce.style.msTransform = 
          ce.style.mozTransform = 
          ce.style.webkitTransform = 
            'translate(' + cp.x + 'px, ' + cp.y + 'px) scale(' + cp.scale + ') rotate(' + cp.rot + 'deg)';
          ce.style.backgroundColor = cp.backgroundColor;  
        }
      }, 1000/60);
    };

    scene = new Tweening();

    $scope.rerun = function() {
      scene.destroy();
      scene = new Tweening();
    }
  }]);
