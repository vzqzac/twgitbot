var author;
var source;

function info(auth, link){
	author = auth;
	source = link;
}

module.exports = {
	info: function(auth, link) {
		author = auth;
		source = link;
	},
	author: author,
	source: source
};