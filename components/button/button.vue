<template>
    <a href="#" class="btn">{{ text }}</a>
</template>

<script>
    import './_btn.scss'
    export default {
        props: ['text'],
        data: {
            text: ''
        }
    }
</script>