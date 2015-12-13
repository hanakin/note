var marked = require('marked');
var yaml = require('js-yaml');
var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.config.debug = true;
Vue.use(require('vue-resource'));
Vue.use(VueRouter);

var router = new VueRouter();

Vue.filter('marked', function (value) {
	return marked(value);
});

new Vue({
	el: '#app',

	data: {
		user: 'hanakin',
		repo: 'midaym',
		barnach: 'master',
		folder: 'backup/posts',
		posts: []
	},

	created: function() {
		this.fetchPosts();
	},

	methods: {
		fetchPosts: function() {
			this.$http.get('https://api.github.com/repos/' + this.user + '/' + this.repo + '/contents/' + this.folder, 
				function(data) {
					for (data of data) {
						var post = {};
						var contents = this.getFile(data.path).split('---');

						post = yaml(contents[0]);
						post.content = contents[1];

						this.posts.push(post);
					}
				}.bind(this)
			);
		},
		
		getFile: function(file) {
			this.$http.get(file,
				function(data) {
					return data;
				}
			);
		},
		
		sortPostbyDate: function(data) {
			return data.sort(function(a, b) {
        		return new Date(b.date) - new Date(a.date);;
    		});
		},
		// getPosts: function(page) {}
	},

	components: {
		posts: require('./components/posts'),
		githubFileExplorer: require('./components/github-file-explorer')
	}
});

// router.map({
// 	'/': 		{ template: require('index.jade') },
// 	'/archive': { template: require('archive.jade') },
// 	'/about': 	{ template: require('about.jade') },
// 	'/contact': { template: require('contact.jade') },
// 	'/post:id': { template: require('single.jade') }
// });

// router.start(App, '#app')

// note: #CCFF90
// facebook: #4862A3
// twitter: #55ACEE
// git: #999999
// dropbox: #007EE5
// g+: #DC4E3D
// flicker: #FF1981
// in: #0177B5
// dribble: #EA4C89
// deviant: #05CC47
// digg: #0093CC
// skype: #00AFF0
// pintrest: #DB242C
// sketch: #F69D52

