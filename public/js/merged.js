$(function() {

	window.Flickr = Backbone.Model.extend({
    });

	window.Flickrs = Backbone.Collection.extend({
        model: Flickr
    });

	window.FlickrFormView = Backbone.View.extend({
		el: $("#search_form"),
		
		search_flickr: function(e) {
			e.preventDefault(); //prevents default submit action	
			query = $("#q").val() //query = value from form field
			$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", // use flickr api
			  {	  	
			    tags: query, //pass value from form field as a tag in flickr api
			    tagmode: "any",
			    format: "json"
			  },
			  function(data) { //success param for jQuery.getJSON
			  	$("#flickrs li").fadeOut(); //remove old results from previous search
			    $.each(data.items, function(i,item){//iterate through results
			    	var flickr = new Flickr(data.items[i]);//new model instance
			        var flickrView = new FlickrView({model: flickr});//new modelView instance
					flickrView.render();//render new view instance
			    });
			  });					
		},

		events: {
			"submit": "search_flickr" //run the search_flickr function on submit
		}
    });

	window.FlickrView = Backbone.View.extend({ //modelView
		render: function() {
			var flickr = _.template( $("#flickr_template").html(), this.model.toJSON()); //put data into template
			$("#flickrs").append(flickr); //add modelView to collection in #flickrs ul
		}
	});  

	/* start twitter */

	window.Tweet = Backbone.Model.extend({
    });

	window.Tweets = Backbone.Collection.extend({
        model: Tweet
    });

	window.TwitterFormView = Backbone.View.extend({
		el: $("#search_form"), //all apis share this formView, and get the value from this form

		search_twitter: function(e) {
			e.preventDefault(); //prevents default submit action
			$.getJSON("http://search.twitter.com/search.json?callback=?",{ //use twitter api
				q: $("#q").val()  //query = value from form field
			}, function(data) { //success param for jQuery.getJSON
				$("#tweets li").fadeOut(); //remove old results from previous search
				for(var i in data.results) { //iterate through results
					var tweet = new Tweet(data.results[i]); //new model instance
					var tweetView = new TweetView({model: tweet}); //new modelView instance
					tweetView.render(); //render new modelView instance
				}
			});
		},
		events: {
			"submit": "search_twitter" //run the search_twitter function on submit
		}
    });

	window.TweetView = Backbone.View.extend({ //modelView
		render: function() {
			var tweet = _.template( $("#tweet_template").html(), this.model.toJSON()); //put data into template
			$("#tweets").append(tweet); //add modelView to collection in #tweets ul
		}
	});  

	/* end twitter */


	var App = Backbone.Router.extend({
		routes: {
		    "": "index"
		},
		index: function() { //new instances of formViews 
			var flickrFormView = new window.FlickrFormView; 
			var twitterFormView = new window.TwitterFormView;
		}
	});

	var app = new App();

	Backbone.history.start();

});
