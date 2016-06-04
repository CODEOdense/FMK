<template>
    <a href="#" class="btn {{ classes }}" data-type="{{ type }}" @click="notify">{{ text }}</a>
</template>

<script>
    import './_btn.scss'
    export default {
        props: ['text', 'type'],
        data: {
            text: '',
            class: '',
            type: ''
        },
        methods: {
            notify: function (event) {
                event.preventDefault();
                this.$dispatch('btn-click', event);
            }
        },
        computed: {
            classes: function() {
                return (this.type.length) ? 'btn--' + this.type : '';
            }
        }
    }
</script>