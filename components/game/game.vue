<template>
	<div class="game">
		GAME!

		<btn text="Next"></btn>
	</div>
</template>

<script>
	import './game.scss';

	import btn from '../button/button.vue';

	export default {
		components: {
			btn
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