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
        app
    },
    data,
    ready: function () {
        console.log(this.$http);
    }
});

// Leak the vue instance
window.app = vm;