<template>
	<div class="game">
		<h1>Fuck, Marry, Kill!</h1>
		<div class="card-wrapper">
			<card text="Actor Name"></card>
			<card text="Actor Name"></card>
			<card text="Actor Name"></card>
		</div>
		<btn text="Next"></btn>
	</div>
</template>

<script>
	import './game.scss';

	import btn from '../button/button.vue';
	import card from '../card/card.vue';

	export default {
		components: {
			btn,
			card
		},
		methods: {
    		nextCard: function () {
    			alert("Todo: start game");
				/*this.$http({url: '/startGame', method: 'GET'}).then(
					{ sessionId, artists } => {
						console.log(sessionId, artists);
					}, response => {
						console.error(response);
					}
				);*/
    		}
    	},
    	events: {
    		'btn-click': function () {
    			this.nextCard();
    		}
    	}
	};
</script>