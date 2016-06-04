<template>
	<div class="game">
		<h1>Fuck, Marry, Kill!</h1>
		<div class="card-wrapper">
			<template v-for="artist in artists">
				<card :text="artist.name"></card>
			</template>
		</div>
		<btn text="Next" type="next-round"></btn>
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
			else {
				throw new Error("app.currentRound is not defined =(");
			}
		},
		components: {
			btn,
			card
		},
		methods: {
    		showNextRound: function () {
    			$.ajax({
					url: '/api/startGame',
					method: 'GET'
				}).then(function (response) {
					app.currentRound = {
						selected: {},
						artists: response.artists
					};
					app.rounds.push(app.currentRound);
				});
    		}
    	},
    	events: {
    		'btn-click': function (event) {
    			const $btn = $(event.target),
    				type = $btn.data("type"),
    				$cards = $btn.closest(".card-wrapper").children();

    			if ($btn.data("type") === "next-round") {
    				this.showNextRound();
    			}
    			else {

    				app.currentRound.selected[type] = true;

	    			$btn.addClass('btn--active').removeClass("btn--disabled");
	    			$btn.siblings().removeClass("btn--active").addClass("btn--disabled");

	    			$cards.not($btn.closest(".card")).find(`.btn[data-type="${type}"]`).addClass('btn--disabled');

	    			$cards.each(function () {
	    				const $btns = $(this).find(".btn--disabled");
	    				if ($btns.length === 3) {
	    					$btns.each(function () {
	    						const $btn = $(this);
	    						console.log(app.currentRound.selected[$btn.data("type")]);
	    						if (!app.currentRound.selected[$btn.data("type")]) {
	    							$btn.removeClass("btn--disabled");
	    						}
	    					})
	    					
	    				}
	    			});
	    		}
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