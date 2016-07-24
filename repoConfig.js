var author;
var source;

module.exports = {
	info: function(auth, link) {
		author = auth;
		source = link;
		console.log(author + source + '     d')
	}
}