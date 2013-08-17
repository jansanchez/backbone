/*

//Urb Object
window.Urb = window.Urb || {};

//Urb.Views
Urb.Views = Urb.Views || {},
Urb.Views.Modules = Urb.Views.Modules || {},
Urb.Views.Modules.Childrens = Urb.Views.Modules.Childrens || {},
Urb.Views.Pages = Urb.Views.Pages || {},
Urb.Views.Lightboxes = Urb.Views.Lightboxes || {},
Urb.Views.Tooltips = Urb.Views.Tooltips || {},
Urb.Views.Notifications = Urb.Views.Notifications || {},
Urb.Views.Tpl = Urb.Views.Tpl || {};
Urb.Views.Tpl.Modules = Urb.Views.Tpl.Modules || {};
Urb.Views.Tpl.Modules.Childrens = Urb.Views.Tpl.Modules.Childrens || {};

//Urb.Services
Urb.Services = Urb.Services || {},
Urb.Services.Facebook = Urb.Services.Facebook || {};
Urb.Services.Twitter = Urb.Services.Twitter || {};
Urb.Services.Google = Urb.Services.Google || {};

//Urb.Models
Urb.Models = Urb.Models || {},
Urb.Models.Collections = Urb.Models.Collections || {};

//Urb.router
Urb.router = {};

//Urb Object
window.Ins = window.Ins || {};

Ins.Models = Ins.Models || {},
Ins.Models.Collections = Ins.Models.Collections || {};
*/






String.prototype.clearTpl = function(){
	return this.toString().replace('data-src', 'src');
}


/*Require Config*/
require.config({
    baseUrl: '/js',
    paths: {
        jquery: 'libs/jquery/jquery-1.9.1.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		text: 'libs/require/text',
		echo: 'libs/jquery/plugins/jqConsola'
    },
	shim: {
		underscore: {
		  exports: '_'
		},
		backbone: {
		  deps: ["underscore", "jquery"],
		  exports: "Backbone"
		}
	}
});

require(['jquery', 'underscore', 'backbone', 'text', 'echo', 'router'], function ($, _, Backbone, text, echo, router) {

	_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

	//definiendo routes
	router.route("*other", "defaultRoute");
	router.route("/*", "home");
	router.route("application/*", "application");
	router.route("application/persona/publicar-aviso-datos", "publicar-aviso-datos");

	// escuchando routes
	router.on("route:defaultRoute", function() {
		console.log('ruta por default');
	});
	router.on("route:home", function(page) {
		console.log('home!');
	});

	router.on("route:publicar-aviso-datos", function(page) {
		console.log('publicar-aviso-datos');

		// solo cuando estemos en publicar-aviso-datos se haran estos requires

		require(['/js/views/modules/GalleryView.js'],
			function (GalleryView){
				//Creamos una instancia de nuestra galería principal
				new GalleryView({});
			}
		);

		require(['/js/views/modules/GalleryVideo.js'],
			function (GalleryVideo){
				//Creamos una instancia de nuestra galería principal
				new GalleryVideo({});
			}
		);

	});


	var root = $("[data-main][data-root]").data("root");
	root = root ? root : '/';

	//iniciando Backbone.history
	Backbone.history.start({
		pushState: true, // usando pushState para no tener que usar los # en las rutas
		root: '/'
	});

});