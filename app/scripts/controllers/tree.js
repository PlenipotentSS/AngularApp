'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:TreeCtrl
 * @description
 * # TreeCtrl
 * Controller of the angularAppApp
 */
angular.module('angularAppApp')
  .controller('TreeController', ['$scope', "$genealogic", function ($scope, genealogic) {
    this.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
    ];

    $(function() {
      $(window).on('resize', function() {
        $('#genealogic-tree').attr('width', $('.ng-scope[ng-view]').width())
        $('#genealogic-tree').attr('height', $(window).innerHeight())
        redisplay();
      })

      document.getElementById('use_fixed_miniature').onchange = function () {
        document.getElementById('miniature_photo_size').disabled = (this.checked ? '' : 'disabled');
      }
      var cycle_remover = function (key, value) { if (key === 'parent') return '<[parent]>'; return value; };
      var redisplay = function () {
        window.genealogic.remove();
        window.genealogic.generate({
          json_input_genealogy: '/json/stevenson-tree.json',
          packing_generation_factor: +document.getElementById('packing_generation_factor').value,
          use_fixed_miniature: document.getElementById('use_fixed_miniature').checked,
          miniature_photo_size: +document.getElementById('miniature_photo_size').value,
          d3_color_scale: document.getElementById('d3_color_scale').value,
          post_rendering_callback: function () { 
            d3.selectAll('svg#genealogic circle').on('click', function () {
              console.log(this);
              var pretty_node_json = JSON.stringify(this.__data__, cycle_remover, '\t');
              document.getElementById('node-json').innerHTML = pretty_node_json;
            });
          }
        });
      }

      $('#genealogic-tree').attr('width', $('.ng-scope[ng-view]').width())
      $('#genealogic-tree').attr('height', $(window).innerHeight())
      redisplay();

      
    })

    $scope.title ="Stevenson Tree";
  }]);
