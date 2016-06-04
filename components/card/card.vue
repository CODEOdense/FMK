<template>
    <div class="card">
        <div class="card__image">
            <img :src="picture" alt="">
        </div>
        <div class="card__name">
            <p>{{ text }}</p>
        </div>
        <div class="fmk-buttons">
            <btn text="Fuck" type="f"></btn>
            <btn text="Marry" type="m"></btn>
            <btn text="Kill" type="k"></btn>
        </div>
    </div>
</template>

<script>
    import './_card.scss';

    import btn from '../button/button.vue';
    export default {
        components: {
            btn
        },
        props: ['text', 'picture']
    }
</script>