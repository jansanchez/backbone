

define(['backbone', 'underscore'],
	function(Backbone, _) {
		var VideoRow = Backbone.View.extend({
			tagName : 'li',
			model : null,
			collection: null,
			events: {
		        "click .remove" : "deleteImage",
		        "click .main" : "changeMain"
			},
			template : null,
			initialize: function(){
				_.bindAll(this);

				this.template = this.template || $.trim($('#urlVideoView').html()).clearTpl();

				this.listenTo(this.model, 'change', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			render : function(){
				var compiled_template = _.template(this.template);
				this.$el.html(compiled_template(this.model.toJSON())).fadeIn();
				return this;
			},
		    deleteImage: function(){
		    	var that = this;
				this.$el.fadeOut('normal', function() {
					that.collection.remove(that.model);
				});
		    },
		    changeMain: function(){
		    	if (this.model.get('main')==1) {
		    		this.model.setMain(0);
		    	}else{
		    		this.model.setMain(1);
		    	}
		    }
		});
		return VideoRow;
	}
);
