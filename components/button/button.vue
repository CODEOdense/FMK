<template>
    <a href="#" class="btn {{ classes }}">{{ text }}</a>
</template>

<script>
    import './_btn.scss'
    export default {
        props: ['text', 'type'],
        data: {
            text: '',
            class: ''
        },
        computed: {
            classes: function() {
                return (this.type.length) ? 'btn--' + this.type : '';
            }
        }
    }
</script>