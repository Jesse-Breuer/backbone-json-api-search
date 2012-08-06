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

	/* start twitter */

		window.Tweet = Backbone.Model.extend({
    });

	window.Tweets = Backbone.Collection.extend({
        model: Tweet
    });

	window.TwitterFormView = Backbone.View.extend({
		el: $("#search_form"),
		search_twitter: function(e) {
			e.preventDefault();
			var self = this;
			$.getJSON("http://search.twitter.com/search.json?callback=?",{
				q: $("#q").val()
			}, function(data) {
				$("#tweets li").fadeOut();
				for(var i in data.results) {
					var tweet = new Tweet(data.results[i]);
					console.log(data.results[i]);
					var tweetView = new TweetView({model: tweet});
					tweetView.render();
				}
			});
		},
		events: {
			"submit": "search_twitter"
		}
    });

	window.TweetView = Backbone.View.extend({
		render: function() {
			var tweet = _.template( $("#tweet_template").html(), this.model.toJSON());
			$("#tweets").append(tweet);
			$("#t_" + this.model.get("id")).fadeIn();
		}
	});  

	/* end twitter */


	var App = Backbone.Router.extend({
		routes: {
		    "": "index"
		},
		index: function() {
			var formView = new window.FormView;
			var twitterFormView = new window.TwitterFormView;
		}
	});

	var app = new App();

	Backbone.history.start();

});
