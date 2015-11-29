var marked = require('marked');
var yaml = require('js-yaml');
var Vue = require('vue');
Vue.config.debug = true;
Vue.use(require('vue-resource'));

Vue.filter('marked', function (value) {
  return marked(value);
});

Vue.filter('yaml', function (value) {
    return yaml.safeLoadAll(value);
});

new Vue({
    el: '#app',
    data: {
        fullRepoName: '',
        username: '',
        repo: '',
    },
    methods: {
        changeRepo: function() {
            var splitData = this.fullRepoName.split('/');
            this.username = splitData[0];
            this.repo = splitData[1];

            console.group("Vue Data");
            console.log("fullRepoName:", this.fullRepoName);
            console.log("username:", this.username);
            console.log("repo:", this.repo);
            console.groupEnd("Vue Data");
        }
    },
    components: {
        githubFileExplorer: require('./components/github-file-explorer')
    }
});

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

