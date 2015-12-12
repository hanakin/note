var VueRouter = require('vue-router');

module.exports = {
	Vue.use(VueRouter);

	var router = new VueRouter();

	router.map({
	    '/': {
	        component: posts
	    },
	    '/archive': {
	        component: archive
	    }
	    '/about': {
	        component: about
	    }
	    '/contact': {
	        component: contct
	    }
	    '/post:id': {
	        component: article
	    }
	})

	router.start(App, '#app')
}

