module.exports = {
    template: require('./template.html'),
    data: function() {
        return {
            path: '/',
            files: [],
            content: '',
            date: '',
            settings: ''
        };
    },
    props: {
        username: {
            type: String,
            required: true
        },
        repo: {
            type: String,
            required: true
        }
    },
    computed: {
        fullRepoUrl: function() {
            return this.username + '/' + this.repo;
        },
        sortedFiles: function() {
            return this.files.slice(0).sort(function(a, b) {
                if (a.type !== b.type) {
                    if (a.type === 'dir') {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    if (a.name < b.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
        }
    },
    methods: {
        getFiles: function() {
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path,
                function(data) {
                    this.files = data;
                }
            );
        },
        changePath: function(path) {
            this.path = '/' + path;
            this.getFiles();
            console.log(this.files);
        },
        goBack: function() {
            this.path = this.path.split('/').slice(0, -1).join('/');
            if (this.path === '') this.path = '/';

            this.getFiles();
        },
        loadPost: function(raw, sha) {
            this.$http.get(raw,
                function(data) {
                    // this.settings = yaml.safeLoadAll(data.split('---')[0], function (data) {
                    //     return data;
                    // });
                    this.date = this.getDate(sha);
                    this.content = data.split('---')[1];
                }
            );
        },
        getDate: function(sha) {
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/git/commits/' + sha,
                function(data) {
                    return data.commiter.date;
                }
            );
        },
    },
    watch: {
        repo: function(newVal, oldVal) {
            this.path = '/';
            this.getFiles();
        }
    },
    created: function() {
        if (this.username && this.repo) this.getFiles();
    }
};
