const app = require('../components/app/app.vue');
const Vue = require('vue');

Vue.use(require('vue-resource'));

// The initial state
const data = {
    sessionId: null,
    rounds: []
};

const vm = new Vue({
    el: 'body',
    components: {
        app: app
    },
    data: data
});

// Leak the vue instance
window.app = vm;