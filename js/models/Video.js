define(['backbone'], function(Backbone) {
	/*Creamos un modelo*/
	var Video = Backbone.Model.extend({
		/*defino sus valores por defecto*/
		defaults : {
			main : 0,
			height : 65,
			preview : null,
			title : null,
			vid : null,
			width : 90
		},
		/*Pseudo constructor del modelo, se ejecuta cuando un modelo es instanciado*/
		initialize : function(){
			/*Bindeamos un evento cuando es cambiado el atributo 'title' de nuestro modelo*/
			/*
			this.on('change', function(){

			});
			*/
		}
	});
	return Video;
});