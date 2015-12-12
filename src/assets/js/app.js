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

Vue.filter('yaml', function (value) {
	return yaml.safeLoadAll(value);
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
					for (post of data) {
						post.date = this.getDate(data.path);
						this.posts.push(post);
					}

					this.posts = this.sortPostbyDate(this.posts);
				}.bind(this));
		},
		
		getDate: function(file) {
			this.$http.get('https://api.github.com/repos/' + this.user + '/' + this.repo + '/commits?path=' + file + '&per_page=1',
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
// 	'/': 		{ component: posts },
// 	'/archive': { component: archive },
// 	'/about': 	{ component: about },
// 	'/contact': { component: contct },
// 	'/post:id': { component: article }
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

