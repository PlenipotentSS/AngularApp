angular.module('angularAppApp')
  .directive('d3Tree', ['d3Service', "$genealogic", function(d3Service, genealogic) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          jQuery(function() {
            jQuery(window).on('resize', function() {
             	jQuery('#genealogic-tree').attr('width', jQuery('.ng-scope[ng-view]').width())
              jQuery('#genealogic-tree').attr('height', jQuery(window).innerHeight())
              redisplay();
            })

            document.getElementById('use_fixed_miniature').onchange = function () {
              document.getElementById('miniature_photo_size').disabled = (this.checked ? '' : 'disabled');
            }
            var cycle_remover = function (key, value) { if (key === 'parent') return '<[parent]>'; return value; };
            var redisplay = function () {
              window.genealogic.remove();
              window.genealogic.generate({
                json_input_genealogy: 'https://rawgit.com/PlenipotentSS/AngularApp/master/app/json/stevenson-tree.json',
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

            jQuery('#genealogic-tree').attr('width', jQuery('.ng-scope[ng-view]').width())
            jQuery('#genealogic-tree').attr('height', jQuery(window).innerHeight())
            redisplay();

            
          })
        });
      }};
  }]);