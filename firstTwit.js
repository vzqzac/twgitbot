console.log('Your first Twgit is bein published');

var Twit = require('twit');

var config = require('./config');

var twit = new Twit(config);

firstTwit();

function firstTwit() {
	var tweet = {
		status: 'Running my first Twgit https://git.io/vKSvG @vzqzac #Github #Twitter #Nodejs'
	}
	twit.post('statuses/update', tweet, tweeted);
	function tweeted(err, data, response) {
		if(err) {
			console.log("Didn't work :( ");
		} else {
	  		console.log("Worked /,,/,");
	  	}
	}
}