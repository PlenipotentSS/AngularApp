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
      .when('/stevenson-tree', {
        templateUrl: 'views/stevenson-tree.html',
        controller: 'TreeController',
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

//d3
angular.module('angularAppApp')
.factory('d3Service', ['$document', '$q', '$rootScope',
  function($document, $q, $rootScope) {
    var d = $q.defer();
    function onScriptLoad() {
      // Load client in the browser
      $rootScope.$apply(function() { d.resolve(window.d3); });
    }
    // Create a script tag with d3 as the source
    // and call our onScriptLoad callback when it
    // has been loaded
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript'; 
    scriptTag.async = true;
    scriptTag.src = 'https://raw.githubusercontent.com/mbostock/d3/master/d3.min.js';
    scriptTag.onreadystatechange = function () {
      if (this.readyState == 'complete') onScriptLoad();
    }
    scriptTag.onload = onScriptLoad;

    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);

    return {
      d3: function() { return d.promise; }
    };
}]);

//shifty angular factory
angular.module('angularAppApp')
  .factory('$genealogic',[function () {

    window.genealogic = (function () { /* exported genealogic */        
        var CONFIG_DEFAULTS = Object.freeze({
            svg_tree_selector: 'svg#genealogic-tree',
            json_input_genealogy: 'genealogy.json',
            path_to_miniature_imgs: false, // if evaluates to false, only use optional .miniature_img_url
            miniature_img_ext: '.jpg',
            use_fixed_miniature: true,
            svg_miniature_selector: 'svg#genealogic-miniature',
            miniature_photo_size: 300,
            packing_generation_factor: null, // default value is set later on as $genealogy_max_depth - 0.5
            d3_color_scale: 'category20',
            leaf_name_dy: '0.3em',
            leaf_caption_dy: '3em',
            wrapped_text_line_height_ems: 1.5,
            post_rendering_callback: false,
        }),
        extend = function () { // jQuery.extend equivalent
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
            return arguments[0];
        },
        string_to_valid_id = function (str) { // Removes any non-letter/digit/- character
            return str.replace(/[^a-zA-Z0-9-]/g, '');
        },
        load_img_patterns = function (svg_defs, node, path_to_imgs, img_ext) {
            add_img_pattern(svg_defs, node, path_to_imgs, img_ext);
            if (node.partner) {
                add_img_pattern(svg_defs, node.partner, path_to_imgs, img_ext);
            }
            for (var i = 0; i < (node.children ? node.children.length : 0); i++) {
                load_img_patterns(svg_defs, node.children[i], path_to_imgs, img_ext);
            }
        },
        add_img_pattern = function (svg_defs, node, path_to_imgs, img_ext) {
            var image_url = (path_to_imgs ? path_to_imgs + encodeURI(node.name) + img_ext : node.miniature_img_url);
            if (image_url) {
                svg_defs.append('svg:pattern')
                    .attr('id', string_to_valid_id(node.name))
                    .attr('patternContentUnits', 'objectBoundingBox')
                    .attr('height', '100%')
                    .attr('width', '100%')
                    .append('svg:image')
                        .attr('preserveAspectRatio', 'xMidYMid slice')
                        .attr('height', '1')
                        .attr('width', '1')
                        .attr('xlink:href', image_url);
            }
        },
        is_img_pattern_loaded = function (img_id) {
            var img_href = d3.select('#' + img_id + ' image').attr('href'),
                tmp_img = new Image();
            tmp_img.src = img_href;
            return tmp_img.width > 0 && tmp_img.height > 0;
        },
        pre_process_nodes = function (node, generation) {
            node.generation = (typeof node.generation !== 'undefined' ? node.generation : generation || 0);
            if (node.partner) { // Adding as a child node
                node.partner.by_alliance_with = node.name;
                node.partner.generation = node.generation;
                if (node.children) {
                    node.children.push(node.partner);
                } else {
                    node.children = [node.partner];
                }
            }
            if (node.children) { // Making a shallow child copy
                var itself = {}; for (var k in node) { itself[k] = node[k]; }
                delete itself.children; // To avoid processing them twice & recursion
                delete itself.partner; // To avoid processing it twice
                node.itself = itself;
                node.children.push(itself);
            }
            for (var i = 0; i < (node.children ? node.children.length : 0); i++) {
                pre_process_nodes(node.children[i], node.generation + 1);
            }
        },
        get_max_depth = function (node) {
            var child_max_depth = 0;
            for (var i = 0; i < (node.children ? node.children.length : 0); i++) {
                var child_depth = get_max_depth(node.children[i]);
                if (child_depth > child_max_depth) {
                    child_max_depth = child_depth;
                }
            }
            return child_max_depth + 1;
        },
        convert_to_links = function (node) {
            var out_links = [];
            var node_itself = node.itself || node;
            for (var j = 0; j < (node.children ? node.children.length : 0); j++) {
                var child_node = node.children[j];
                if (child_node === node_itself) { continue; }
                out_links.push({source: node_itself, target: child_node.itself || child_node});
                [].push.apply(out_links, convert_to_links(child_node));
            }
            return out_links;
        },
        linkArc = function (d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
        },
        miniature_mouseover = function (d, miniature_node) {
            var img_id = string_to_valid_id(d.name);
            d.default_style = miniature_node.attr('style');
            d.default_class = miniature_node.attr('class');
            if (is_img_pattern_loaded(img_id)) {
                miniature_node.attr('style', 'fill-opacity: 1; fill: url(#' + img_id + ')')
                    .attr('class', d.default_class + ' filled_with_img');
            }
        },
        miniature_mouseout = function (d, miniature_node) {
            miniature_node.attr('style', d.default_style).attr('class', d.default_class);
        },
        wrap_text = function (selection, content_key, line_height, strip_nonalpha) { // Inspired by http://bl.ocks.org/mbostock/7555321
            selection.each(function(d) {
                var text_node = d3.select(this),
                    content = d[content_key];
                if (strip_nonalpha) {
                    content = content.replace(/[0-9]/g, '');
                }
                var words = content.split(/\s+/);
                if (words.length === 1) {
                    text_node.text(content);
                    return;
                }
                var width = d.r * 2,
                    line = [],
                    line_number = 0,
                    tspan = text_node.append('tspan').attr('x', 0).attr('y', 0),
                    tspans = [tspan];
                for (var i = 0; i < words.length; i++) {
                    var word = words[i];
                    line.push(word);
                    tspan.text(line.join(' '));
                    if (line.length > 1 && tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(' '));
                        line = [word];
                        tspan = text_node.append('tspan').attr('x', 0).attr('y', 0).text(word);
                        tspans.push(tspan);
                    }
                }
                var dy = parseFloat(text_node.attr('dy')) - line_height * (tspans.length - 1) / 2;
                for (line_number = 0; line_number < tspans.length; line_number++) {
                    tspan = tspans[line_number];
                    tspan.attr('dy', dy + 'em');
                    dy += line_height;
                }
            });
        },
        check_exists = function (selector) {
            if (d3.select(selector).empty()) {
                throw new Error('No svg element found for selector: ' + selector);
            }
        },
        generate = function (args) {
            var conf = extend({}, CONFIG_DEFAULTS, args),
                fill = d3.scale[conf.d3_color_scale](),
                svg = d3.select(conf.svg_tree_selector);
            check_exists(conf.svg_tree_selector);

            if (conf.use_fixed_miniature) {
                check_exists(conf.svg_miniature_selector);
                d3.select(conf.svg_miniature_selector)
                    .attr('width', conf.miniature_photo_size + 4)
                    .attr('height', conf.miniature_photo_size + 4)
                    .append('svg:circle')
                        .attr('class', 'miniature')
                        .attr('cx', conf.miniature_photo_size / 2 + 2)
                        .attr('cy', conf.miniature_photo_size / 2 + 2)
                        .attr('r', conf.miniature_photo_size / 2)
                        .attr('style', 'fill-opacity: 0');
            }

            var display_genealogy = function (json) {
                var svg_defs = d3.select(conf.svg_tree_selector).select('defs');
                if (svg_defs.empty()) {
                    svg_defs = d3.select(conf.svg_tree_selector).append('svg:defs');
                    load_img_patterns(svg_defs, json, conf.path_to_miniature_imgs, conf.miniature_img_ext);
                }
                pre_process_nodes(json);

                var max_tree_depth = get_max_depth(json);
                if (!conf.packing_generation_factor || conf.packing_generation_factor <= max_tree_depth - 1) {
                    conf.packing_generation_factor = max_tree_depth - 0.5;
                }

                var links = convert_to_links(json),
                    pack = d3.layout.pack()
                        .size([svg.attr('width'), svg.attr('height')])
                        .value(function(d) { return conf.packing_generation_factor - d.generation; }),
                    node = svg.datum(json).selectAll('.node')
                        .data(pack.nodes).enter()
                        .append('svg:g')
                            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; }),
                    leaf = node.filter(function(d) { return !d.children; });

                leaf.append('svg:text')
                    .attr('class', 'leaf name')
                    .attr('dy', conf.leaf_name_dy)
                    // Ugly homonyms handling: 'name' can contain digits to distinguish people, which are stripped below
                    .call(wrap_text, 'name', conf.wrapped_text_line_height_ems, true);
                leaf.filter(function(d) { return d.caption; }).append('svg:text')
                    .attr('class', 'leaf caption')
                    .attr('dy', conf.leaf_caption_dy)
                    .call(wrap_text, 'caption', conf.wrapped_text_line_height_ems);
                leaf.append('svg:circle')
                    .attr('class', 'leaf')
                    .attr('r', function(d) { return d.r; })
                    .style('fill', function(d) { return fill(d.generation + (d.by_alliance_with ? 0.5 : 0)); })
                    .style('stroke', function(d) { return d3.rgb(fill(d.generation + (d.by_alliance_with ? 0.5 : 0))).darker(); })
                    .on('mouseover', function (d) {
                        miniature_mouseover(d, (conf.use_fixed_miniature ? d3.select(conf.svg_miniature_selector).select('circle') : d3.select(this)));
                    })
                    .on('mouseout', function (d) {
                        miniature_mouseout(d, (conf.use_fixed_miniature ? d3.select(conf.svg_miniature_selector).select('circle') : d3.select(this)));
                    });

                svg.selectAll('line').data(links)
                    .enter().append('svg:path')
                    .attr('class', 'branch')
                    .style('stroke', function(d) { return d3.rgb(fill(d.target.by_alliance_with + 1)).darker(); })
                    .attr('d', linkArc);

                if (conf.post_rendering_callback) {
                    conf.post_rendering_callback();
                }
            };

            if (typeof conf.json_input_genealogy === 'string') {
                d3.json(conf.json_input_genealogy, function(json) {
                    display_genealogy(json);
                });
            } else {
                display_genealogy(conf.json_input_genealogy);
            }
        },
        remove = function (args) {
            var conf = extend({}, CONFIG_DEFAULTS, args);
            check_exists(conf.svg_tree_selector);
            d3.select(conf.svg_tree_selector).selectAll('g').remove();
            d3.select(conf.svg_tree_selector).selectAll('path').remove();
            check_exists(conf.svg_miniature_selector);
            d3.select(conf.svg_miniature_selector).selectAll('*').remove();
        };
        return {
            generate: generate,
            remove: remove,
        };
    })();

    return window.genealogic;
  }]);