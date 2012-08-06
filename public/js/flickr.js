$(function() {

	window.Flickr = Backbone.Model.extend({
    });

	window.Flickrs = Backbone.Collection.extend({
        model: Flickr
    });

	window.FormView = Backbone.View.extend({
		el: $("#search_form"),
		search_flickr: function(e) {
			e.preventDefault();
			var self = this;

query = $("#q").val()
			$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
			  {	  	
			    tags: query,
			    tagmode: "any",
			    format: "json"
			  },
			  function(data) {
			  	$("#flickrs li").fadeOut();
			  	console.log('function firing');
			    $.each(data.items, function(i,item){
			    	console.log(data.items[i]);
			    	var flickr = new Flickr(data.items[i]);
			      //if ( i == 3 ) return false;
			      var flickrView = new FlickrView({model: flickr});
					flickrView.render();
			    });
			  });			
			

		},
		events: {
			"submit": "search_flickr"
		}
    });

	window.FlickrView = Backbone.View.extend({
		render: function() {
			var flickr = _.template( $("#flickr_template").html(), this.model.toJSON());
			console.log(flickr);
			$("#flickrs").append(flickr);
		}
	});  


	var App = Backbone.Router.extend({
		routes: {
		    "": "index"
		},
		index: function() {
			var formView = new window.FormView;
		}
	});

	var app = new App();

	Backbone.history.start();

});
