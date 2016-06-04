<template>
    <a href="#" class="btn {{ classes }}" data-type="{{ type }}" @click="notify">{{ text }}</a>
</template>

<script>
    import './_btn.scss'
    export default {
        props: ['text', 'type'],
        data: function () {
            return {
                class: ''
            }
        },
        methods: {
            notify: function (event) {
                event.preventDefault();
                this.$dispatch('btn-click', event);
            }
        },
        computed: {
            classes: function() {
                return this.type ? 'btn--' + this.type : '';
            }
        }
    }
</script>