<template>
	<div class="game">
		<h1>Fuck, Marry, Kill!</h1>
		<div class="card-wrapper">
			<template v-for="artist in artists">
				<card :text="artist.name"></card>
			</template>
		</div>
		<btn text="Next"></btn>
	</div>
</template>

<script>
	import './game.scss';

	import btn from '../button/button.vue';
	import card from '../card/card.vue';

	export default {
		data: function () {
			
			if (window.app) {
				return app.currentRound;
			}

			return {
				artists: [{
					name: 'John Doe'
				}]
			};
		},
		components: {
			btn,
			card
		},
		methods: {
    		nextCard: function () {
    			alert("Todo: show 3 next game");
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
    	},
    	activate: function (done) {

    		const that = this;

    		console.log("Game activated!");
    		done();

    		// Todo: find en måde hvorpå at tilgå den globale app.watch uden en grim timeout
			setTimeout(() => {

				// Watch the state
				app.$watch('currentRound', function (newVal, oldVal) {
					console.info(`New round!`);
					//this.currentView = 'game';
					that.artists = app.currentRound.artists;
				});
			}, 1000);
		}
	};
</script>