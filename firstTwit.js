var Twit = require('twit');
var config = require('./config');
console.log(config);
var fs = require('fs');
var confT = require('commander');

confT
	.option('-k --consumer_key [value]', 'Consumer key')
	.option('-s --consumer_secret [value]', 'Consumer secret')
	.option('-a --access_token [value]', 'Access token')
	.option('-S --access_token_secret [value]', 'Access token secret')
	.option('-t --timeout_ms [value]', 'Timeout ms')
	.parse(process.argv);

if (confT.consumer_key &&	confT.consumer_secret && confT.access_token && confT.access_token_secret) {
	config.consumer_key = confT.consumer_key;
	config.consumer_secret = confT.consumer_secret;
	config.access_token = confT.access_token;
	config.access_token_secret = confT.access_token_secret;
	if (confT.timeout_ms) {
		config.timeout_ms = confT.timeout_ms;
	}
} else {
	console.log("Fill your api information");
}

fs.writeFile(__dirname + '/config.js', "module.exports = " + JSON.stringify(config), function(err) {
	if (err)
		console.log(err);
})

var twit = new Twit(config);

firstTwit();

function firstTwit() {
	var tweet = {
		status: 'Running my first Twgit https://git.io/vKSvG @vzqzac #Github #Twitter #Nodejs'
	}
	twit.post('statuses/update', tweet, tweeted);
	function tweeted(err, data, response) {
		if(err) {
			console.log(err);
		} else {
	  		console.log("Worked /,,/,");
	  	}
	}
}
