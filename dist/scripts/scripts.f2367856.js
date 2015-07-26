"use strict";angular.module("angularAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","angular-capitalize-filter"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainController",controllerAs:"main"}).when("/about",{templateUrl:"views/detail.html",controller:"AboutController",controllerAs:"about"}).when("/crafty",{templateUrl:"views/crafty.html",controller:"GameController",controllerAs:"game"}).when("/shifty",{templateUrl:"views/shifty.html",controller:"ShiftyController",controllerAs:"shifty"}).when("/contact",{templateUrl:"views/detail.html",controller:"ContactController",controllerAs:"contact"}).when("/stevenson-tree",{templateUrl:"views/stevenson-tree.html",controller:"TreeController",controllerAs:"about"}).when("/styles/main.css",{templateUrl:"views/about.html",controller:"AboutController",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("angularAppApp").factory("$crafty",["$window",function(a){var b=a.Crafty||{};return b.shutdown=function(){b.stop(),b.audio.remove(),b.viewport.reset(),b("2D").each(function(){this.has("Persist")||this.destroy()}),angular.element(b.stage.elem).addClass("hide")},b.startup=function(a,c){b.init(a,c),angular.element(b.stage.elem).removeClass("hide")},b}]),angular.module("angularAppApp").factory("$shifty",["$window",function(a){var b=a.Tweenable||{};return b}]),angular.module("angularAppApp").factory("$genealogic",["$window",function(a){return window.genealogic=function(){var a=Object.freeze({svg_tree_selector:"svg#genealogic-tree",json_input_genealogy:"genealogy.json",path_to_miniature_imgs:!1,miniature_img_ext:".jpg",use_fixed_miniature:!0,svg_miniature_selector:"svg#genealogic-miniature",miniature_photo_size:300,packing_generation_factor:null,d3_color_scale:"category20",leaf_name_dy:"0.3em",leaf_caption_dy:"3em",wrapped_text_line_height_ems:1.5,post_rendering_callback:!1}),b=function(){for(var a=1;a<arguments.length;a++)for(var b in arguments[a])arguments[a].hasOwnProperty(b)&&(arguments[0][b]=arguments[a][b]);return arguments[0]},c=function(a){return a.replace(/[^a-zA-Z0-9-]/g,"")},d=function(a,b,c,f){e(a,b,c,f),b.partner&&e(a,b.partner,c,f);for(var g=0;g<(b.children?b.children.length:0);g++)d(a,b.children[g],c,f)},e=function(a,b,d,e){var f=d?d+encodeURI(b.name)+e:b.miniature_img_url;f&&a.append("svg:pattern").attr("id",c(b.name)).attr("patternContentUnits","objectBoundingBox").attr("height","100%").attr("width","100%").append("svg:image").attr("preserveAspectRatio","xMidYMid slice").attr("height","1").attr("width","1").attr("xlink:href",f)},f=function(a){var b=d3.select("#"+a+" image").attr("href"),c=new Image;return c.src=b,c.width>0&&c.height>0},g=function(a,b){if(a.generation="undefined"!=typeof a.generation?a.generation:b||0,a.partner&&(a.partner.by_alliance_with=a.name,a.partner.generation=a.generation,a.children?a.children.push(a.partner):a.children=[a.partner]),a.children){var c={};for(var d in a)c[d]=a[d];delete c.children,delete c.partner,a.itself=c,a.children.push(c)}for(var e=0;e<(a.children?a.children.length:0);e++)g(a.children[e],a.generation+1)},h=function(a){for(var b=0,c=0;c<(a.children?a.children.length:0);c++){var d=h(a.children[c]);d>b&&(b=d)}return b+1},i=function(a){for(var b=[],c=a.itself||a,d=0;d<(a.children?a.children.length:0);d++){var e=a.children[d];e!==c&&(b.push({source:c,target:e.itself||e}),[].push.apply(b,i(e)))}return b},j=function(a){var b=a.target.x-a.source.x,c=a.target.y-a.source.y,d=Math.sqrt(b*b+c*c);return"M"+a.source.x+","+a.source.y+"A"+d+","+d+" 0 0,1 "+a.target.x+","+a.target.y},k=function(a,b){var d=c(a.name);a.default_style=b.attr("style"),a.default_class=b.attr("class"),f(d)&&b.attr("style","fill-opacity: 1; fill: url(#"+d+")").attr("class",a.default_class+" filled_with_img")},l=function(a,b){b.attr("style",a.default_style).attr("class",a.default_class)},m=function(a,b,c,d){a.each(function(a){var e=d3.select(this),f=a[b];d&&(f=f.replace(/[0-9]/g,""));var g=f.split(/\s+/);if(1===g.length)return void e.text(f);for(var h=2*a.r,i=[],j=0,k=e.append("tspan").attr("x",0).attr("y",0),l=[k],m=0;m<g.length;m++){var n=g[m];i.push(n),k.text(i.join(" ")),i.length>1&&k.node().getComputedTextLength()>h&&(i.pop(),k.text(i.join(" ")),i=[n],k=e.append("tspan").attr("x",0).attr("y",0).text(n),l.push(k))}var o=parseFloat(e.attr("dy"))-c*(l.length-1)/2;for(j=0;j<l.length;j++)k=l[j],k.attr("dy",o+"em"),o+=c})},n=function(a){if(d3.select(a).empty())throw new Error("No svg element found for selector: "+a)},o=function(c){var e=b({},a,c),f=d3.scale[e.d3_color_scale](),o=d3.select(e.svg_tree_selector);n(e.svg_tree_selector),e.use_fixed_miniature&&(n(e.svg_miniature_selector),d3.select(e.svg_miniature_selector).attr("width",e.miniature_photo_size+4).attr("height",e.miniature_photo_size+4).append("svg:circle").attr("class","miniature").attr("cx",e.miniature_photo_size/2+2).attr("cy",e.miniature_photo_size/2+2).attr("r",e.miniature_photo_size/2).attr("style","fill-opacity: 0"));var p=function(a){var b=d3.select(e.svg_tree_selector).select("defs");b.empty()&&(b=d3.select(e.svg_tree_selector).append("svg:defs"),d(b,a,e.path_to_miniature_imgs,e.miniature_img_ext)),g(a);var c=h(a);(!e.packing_generation_factor||e.packing_generation_factor<=c-1)&&(e.packing_generation_factor=c-.5);var n=i(a),p=d3.layout.pack().size([o.attr("width"),o.attr("height")]).value(function(a){return e.packing_generation_factor-a.generation}),q=o.datum(a).selectAll(".node").data(p.nodes).enter().append("svg:g").attr("transform",function(a){return"translate("+a.x+","+a.y+")"}),r=q.filter(function(a){return!a.children});r.append("svg:text").attr("class","leaf name").attr("dy",e.leaf_name_dy).call(m,"name",e.wrapped_text_line_height_ems,!0),r.filter(function(a){return a.caption}).append("svg:text").attr("class","leaf caption").attr("dy",e.leaf_caption_dy).call(m,"caption",e.wrapped_text_line_height_ems),r.append("svg:circle").attr("class","leaf").attr("r",function(a){return a.r}).style("fill",function(a){return f(a.generation+(a.by_alliance_with?.5:0))}).style("stroke",function(a){return d3.rgb(f(a.generation+(a.by_alliance_with?.5:0))).darker()}).on("mouseover",function(a){k(a,e.use_fixed_miniature?d3.select(e.svg_miniature_selector).select("circle"):d3.select(this))}).on("mouseout",function(a){l(a,e.use_fixed_miniature?d3.select(e.svg_miniature_selector).select("circle"):d3.select(this))}),o.selectAll("line").data(n).enter().append("svg:path").attr("class","branch").style("stroke",function(a){return d3.rgb(f(a.target.by_alliance_with+1)).darker()}).attr("d",j),e.post_rendering_callback&&e.post_rendering_callback()};"string"==typeof e.json_input_genealogy?d3.json(e.json_input_genealogy,function(a){p(a)}):p(e.json_input_genealogy)},p=function(c){var d=b({},a,c);n(d.svg_tree_selector),d3.select(d.svg_tree_selector).selectAll("g").remove(),d3.select(d.svg_tree_selector).selectAll("path").remove(),n(d.svg_miniature_selector),d3.select(d.svg_miniature_selector).selectAll("*").remove()};return{generate:o,remove:p}}(),window.genealogic}]),angular.module("angularAppApp").controller("MainController",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("angularAppApp").controller("AboutController",["$scope",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.title="About!",a.items=[{name:"jimmy hopkins",title:"nothing",likes:0},{name:"steve",title:"developer",likes:0},{name:"john",title:"manager",likes:0}],a.addIndex=function(b){a.items[b].likes+=1}}]),angular.module("angularAppApp").controller("ContactController",["$scope",function(a){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.items=[{name:"david",title:"pm",likes:0},{name:"caitlin",title:"protector",likes:0},{name:"leah",title:"antagonist",likes:0}],a.title="Contact!"}]),angular.module("angularAppApp").controller("NavController",["$scope","$location",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.isActive=function(a){var c=a===b.url();return c}}]),angular.module("angularAppApp").controller("GameController",["$scope","$crafty",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var c=.25;Crafty.init(window.innerWidth-45,window.innerHeight,document.getElementById("game")),Crafty.e("Floor, 2D, Canvas, Color, table").attr({x:0,y:250,w:250,h:10}).color("#F00"),Crafty.e("Floor, 2D, Canvas, Color, table").attr({x:150,y:450,w:250,h:10}).color("#F00"),Crafty.e("Floor, 2D, Canvas, Color, table").attr({x:0,y:600,w:900,h:10}).color("#F00");for(var d=1;50>d;d++)Crafty.e("2D, Canvas, player, Color, Fourway, Gravity, Collision").attr({x:0,y:0,w:50,h:50}).color("green").fourway(c*d).gravity("Floor").collision()}]),angular.module("angularAppApp").controller("ShiftyController",["$scope","$shifty",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var c,d=function(){var a=this;this.TA=[],this.TP=[],this.TE=[],this.interval,this.destroy=function(){a.interval&&clearInterval(a.interval)};for(var c=1;20>=c;c++)a.TE[c]=document.getElementById("fig"+c.toString()),a.TA[c]=new b,a.TA[c].setConfig({attachment:[c,a.TE[c]],from:{x:0,y:0,rot:0,scale:1,backgroundColor:"#ff0000"},to:{x:320*Math.random()-160,y:480*Math.random()-240,rot:360*Math.random(),scale:4.5*Math.random()+.5,backgroundColor:"#ffff00"},duration:2e3*Math.random()+500,step:function(b,c){c&&(a.TP[c[0]]=b)},easing:"bounce"});for(var d=1;20>=d;d++)a.TA[d].tween();a.interval=setInterval(function(){for(var b=1;20>=b;b++){var c=a.TE[b],d=a.TP[b];c.style.transform=c.style.msTransform=c.style.mozTransform=c.style.webkitTransform="translate("+d.x+"px, "+d.y+"px) scale("+d.scale+") rotate("+d.rot+"deg)",c.style.backgroundColor=d.backgroundColor}},1e3/60)};c=new d,a.rerun=function(){c.destroy(),c=new d}}]),angular.module("angularAppApp").controller("TreeController",["$scope","$genealogic",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],$(function(){$(window).on("resize",function(){$("#genealogic-tree").attr("width",$(".ng-scope[ng-view]").width()),$("#genealogic-tree").attr("height",$(window).innerHeight()),b()}),document.getElementById("use_fixed_miniature").onchange=function(){document.getElementById("miniature_photo_size").disabled=this.checked?"":"disabled"};var a=function(a,b){return"parent"===a?"<[parent]>":b},b=function(){window.genealogic.remove(),window.genealogic.generate({json_input_genealogy:"/json/stevenson-tree.json",packing_generation_factor:+document.getElementById("packing_generation_factor").value,use_fixed_miniature:document.getElementById("use_fixed_miniature").checked,miniature_photo_size:+document.getElementById("miniature_photo_size").value,d3_color_scale:document.getElementById("d3_color_scale").value,post_rendering_callback:function(){d3.selectAll("svg#genealogic circle").on("click",function(){console.log(this);var b=JSON.stringify(this.__data__,a,"	");document.getElementById("node-json").innerHTML=b})}})};$("#genealogic-tree").attr("width",$(".ng-scope[ng-view]").width()),$("#genealogic-tree").attr("height",$(window).innerHeight()),b()}),a.title="Stevenson Tree"}]),angular.module("angularAppApp").run(["$templateCache",function(a){a.put("views/contact.html",'<h1>{{title | capitalize:\'all\'}}</h1> <div class="col-md-6 col-md-push-3"> <article ng-repeat="item in items"> <h1 class="title"> {{item.name | capitalize:\'first\'}}</h1> <h2 class="date"> {{item.title}}</h2> <div class="rating"> <p class="likes" ng-click="addIndex($index)">+ {{item.likes}}</p> </div> </article> </div>'),a.put("views/crafty.html",'<div id="game"> </div>'),a.put("views/detail.html",'<h1>{{title | capitalize:\'all\'}}</h1> <div class="col-md-6 col-md-push-3"> <article ng-repeat="item in items"> <h1 class="title"> {{item.name | capitalize:\'first\'}}</h1> <h2 class="date"> {{item.title}}</h2> <div class="rating"> <p class="likes" ng-click="addIndex($index)">+ {{item.likes | currency}}</p> </div> </article> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/shifty.html",'<div class="view"> <div class="fig" id="fig1"></div> <div class="fig" id="fig2"></div> <div class="fig" id="fig3"></div> <div class="fig" id="fig4"></div> <div class="fig" id="fig5"></div> <div class="fig" id="fig6"></div> <div class="fig" id="fig7"></div> <div class="fig" id="fig8"></div> <div class="fig" id="fig9"></div> <div class="fig" id="fig10"></div> <div class="fig" id="fig11"></div> <div class="fig" id="fig12"></div> <div class="fig" id="fig13"></div> <div class="fig" id="fig14"></div> <div class="fig" id="fig15"></div> <div class="fig" id="fig16"></div> <div class="fig" id="fig17"></div> <div class="fig" id="fig18"></div> <div class="fig" id="fig19"></div> <div class="fig" id="fig20"></div> </div> <a href="javascript:void(0)" class="btn btn-lg btn-success" ng-click="rerun()">Re Run</a>'),a.put("views/stevenson-tree.html",'<h1>{{title | capitalize:\'all\'}}</h1> <div style="display:none"> packing_generation_factor: <input id="packing_generation_factor" type="number" step="any" min="1" value="1" style="width:3em"> <br> use_fixed_miniature: <input id="use_fixed_miniature" type="checkbox"> miniature_photo_size: <input id="miniature_photo_size" type="number" value="300" disabled style="width:4em"> <br> d3_color_scale: <select id="d3_color_scale"> <option value="category10">category10</option> <option value="category20" selected>category20</option> <option value="category20b">category20b</option> <option value="category20c">category20c</option> </select> <br> <input type="submit" value="Generate" onclick="redisplay()"> </div> <svg width="1000" height="1000" id="genealogic-tree"> <svg id="genealogic-miniature">')}]);