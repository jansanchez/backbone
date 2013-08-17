define(['backbone', 'underscore', 'views/modules/childrens/VideoRow',  '/js/models/collections/Videos.js'], 
	function(Backbone, _, VideoRow, Videos) {
		var GalleryVideo = Backbone.View.extend({
			el : $('#divVideoGallery'),
			contador : 0,
			collection: null,
			events: {
				"click #btnAddVideo" : "addVideoUrl"
			},
			initialize: function() {
				_.bindAll(this);
				this.collection = new Videos();
				this.listenTo(this.collection, 'add', this.addOne);
				this.listenTo(this.collection, 'remove', this.removeOne);
			},
			render : function(){
			},
			addVideo : function(vid,that){

				var videoid = $('#txtVideo').val();
				var m;

				if (m = videoid.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i)) {
				videoid = m[1];
				}

				if (!videoid.match(/^[a-z0-9_-]{11}$/i)) {
					echo('La url del video ingresado no es correcta.');
					return;
				}

				var url='http://gdata.youtube.com/feeds/api/videos/' + encodeURIComponent(videoid);

				$.ajax({
					url: url,
					data: 'v=2&alt=json',
					type: "GET",
					dataType: "json",
					success: function(response){
						that.collection.add(
							{
								vid: videoid,
								title: response.entry.title.$t,
								preview: response.entry.media$group.media$thumbnail[0].url
							}
						);
						$('#txtVideo').val('');
					},
					error: function (request, status, error) {
						echo('El video solicitado no existe.');
					}
				});
			},
			addVideoUrl: function(){
				this.addVideo(this.$('#txtVideo').val(), this);
			},
			addOne : function(modelo){
				var view = new VideoRow({model : modelo, collection: this.collection});
				this.$('#olVideoList').append( view.render().el );

			},
			removeOne : function(modelo){
		        modelo.destroy();
		        
			}
		});
		return GalleryVideo;
});