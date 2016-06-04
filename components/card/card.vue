<template>
    <div class="card">
        <div class="card__image">
            <img src="http://placekitten.com/g/200/300" alt="">
        </div>
        <div class="card__name">
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script>
    import './_card.scss'
    export default {
        props: ['text'],
        data: {
            text: ''
        }
    }
</script>