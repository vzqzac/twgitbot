var config = require('./config');
var Twit = require('twit');
var twgit = require('commander');
var repo = require('./repoConfig.js');

var twit = new Twit(config);

twgit
	.option('-a --author [value]', 'Author of repository')
	.option('-u --url [value]', 'Link to repository')
	.parse(process.argv);

if(twgit.author && twgit.url) {
	console.log(twgit.author + " " + twgit.url);
	repo.info(twgit.author, twgit.url);
} else {
	console.log("Append -a 'Author of repo' and -u 'Source code'");
}


// understand commander