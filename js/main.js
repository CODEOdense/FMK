var App = require('../components/app/app.vue');
var Vue = require('vue');
var Button = require('../components/button/button.vue');

new Vue({
    el: 'body',
    components: {
        app: App,
        "btn": Button
    }
});