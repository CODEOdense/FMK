const app = require('../components/app/app.vue');
const Vue = require('vue');

Vue.use(require('vue-resource'));

//Vue.http.options.root = '/root';
//Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

/*Vue.http.interceptors.push({
    request: function (request) {

    	// Set domain
    	if (!request.url.indexOf('/api') !== 0) {
    		request.url = `/api/${request.url}`.replace('//', '/');
    	}

        return request;
    },

    response: function (response) {
        return response;
    }
});
*/

// The initial state
const data = {
    sessionId: null,
    rounds: []
};

const vm = new Vue({
    el: 'body',
    components: {
        app
    },
    ready: function () {
    	console.log("App ready...");
    },
    data
});

// Leak the vue instance
window.app = vm;