
define(['backbone', 'underscore', 'models/Video'], function(Backbone, _, Video) {

	/*Creamos una colección de Videones*/
	var Videos = Backbone.Collection.extend({
		/*Establecemos como modelo de la colección al modelo: Video*/
		model : Video
	});

	return Videos;

});