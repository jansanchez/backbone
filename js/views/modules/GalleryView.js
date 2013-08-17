
define(['backbone', 'underscore', 'views/modules/childrens/GalleryRow',  '/js/models/collections/Images.js'], 
	function(Backbone, _, galleryRow, Images) {

	/*Creamos la vista principal que contendrá nuestras vistas hijas*/
	var GalleryView = Backbone.View.extend({
		/*Declaro el elemento principal de la vista*/
		el : $('#divImageGallery'),
		contador : 0,
		collection: null,
		/*Defino la lista de eventos para nuestra vista principal*/
		events: {
			/*Defino el evento "click" en el elemento "#btnChoose" al ser disparado ejecutara la funcion "addImg" */
			"click #btnChoose" : "addImg"
		},
		initialize: function() {

			/*_.bindAll(this) hace que las funciones apunten siempre al "this" del objeto principal*/
			_.bindAll(this);

			/*Asignamos a la variable "collection" una instancia de nuestra Colección*/
			this.collection = new Images();

			/*Desde la vista escuchamos cuando suceda el evento "add" en la colección y lanzamos la función addOne*/
			this.listenTo(this.collection, 'add', this.addOne);
			/*Desde la vista escuchamos cuando suceda el evento "remove" en la colección y lanzamos la función removeOne*/
			this.listenTo(this.collection, 'remove', this.removeOne);
		},
		/*Función "render" de la vista*/
		render : function(){
			/*Aqui renderizo la vista principal, la cargo con datos si deseo, en esta ocasión no la usamos*/
		},
		/*Función de la vista principal para agregar un modelo a la colección*/
		addImg: function(){
			this.contador++;
			/*Agregamos un modelo de datos nuevo a la colección*/
			this.collection.add({src: this.contador+'.jpg', title: this.contador});
		},
		/*Cuando hubo un "add" en la colección ejecutamos esta función y recibimos como parametro el modelo afectado*/
		addOne : function(modelo){

			/*Creamos una instancia de una vista hija y le pasamos su modelo recientemente creado*/
			var view = new galleryRow({model : modelo, collection: this.collection});

			/*Appeneamos dentro de $('.dragger') el nuevo elemento que nos devuelve la función render de la vista hija*/
			//console.profile('selector');
			this.$('.dragger').append( view.render().el );
			//console.profileEnd('selector');
		},
		/*Cuando hubo un "remove" en la colección ejecutamos esta función y recibimos como parametro el modelo afectado*/
		removeOne : function(modelo){
			//Destruimos el modelo
			//console.profile('destr');
	        modelo.destroy();
	        //console.profileEnd('destr');
		}
	});

	return GalleryView;

});