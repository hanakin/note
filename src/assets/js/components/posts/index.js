var github = require('github-api');

module.exports = {
	template: require('./template.html'),
	
	props: ['posts', 'user', 'repo', 'path', 'branch'],

	data: function() {
		return {
			posts: []
		}
	},

}