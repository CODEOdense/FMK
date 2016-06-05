<template>
	<div class="game">
		<h1>Fuck, Marry, Kill!</h1>
		<div class="card-wrapper">
			<template v-for="artist in currentRound.artists">
				<card :text="artist.name" :picture="artist.picture"></card>
			</template>
		</div>
		<btn text="Next" type="next-round"></btn>
	</div>
</template>

<script>
	import './game.scss';

	import btn from '../button/button.vue';
	import card from '../card/card.vue';

	import dummyApi from '../../dummy-api';

	let useDummyApi = true;

	export default {
		data: function() {
			return {
				currentRound: {
					selected: {},
					artists: [ ]
				},
				rounds: [ ],
				sessionId: null
			}
		},
		components: {
			btn,
			card
		},
		methods: {
    		showNextRound: function () {
				var that = this;
				console.log('NextGame!');
				if(that.rounds.length > 0) {
					if (useDummyApi) {
						dummyApi.startGame().then(response => {
							that.currentRound = {
								selected: {},
								artists: response.artists
							};
							that.rounds.push(app.currentRound);
						});
					}
					else {
						$.ajax({
							url: '/api/startGame',
							method: 'POST',
							dataType: 'json',
							contentType: 'application/json',
							data: JSON.stringify({
								sid: that.sessionId,
								artists: that.currentRound.artists,
								round: that.rounds.length
							})
						}).then(function (response) {
							that.currentRound = {
								selected: {},
								artists: response.artists
							};
							that.rounds.push(app.currentRound);
						});
					}
				} else {
					if (useDummyApi) {
						dummyApi.startGame().then(response => {
							that.sessionId = response.sid;
							that.currentRound = {
								selected: {},
								artists: response.artists
							};
							that.rounds.push(app.currentRound);
						});
					}
					else {
						$.ajax({
							url: '/api/startGame',
							method: 'GET',
							dataType: 'json',
						}).then(function (response) {
							that.sessionId = response.sid;
							that.currentRound = {
								selected: {},
								artists: response.artists
							};
							that.rounds.push(app.currentRound);
						});
					}
				}
    		}
    	},
    	events: {
    		'btn-click': function (event) {
				var that = this;
    			const $btn = $(event.target),
    				type = $btn.data("type"),
    				$cards = $btn.closest(".card-wrapper").children();

    			if ($btn.data("type") === "next-round") {
    				this.showNextRound();
    			}
    			else {

    				that.currentRound.selected[type] = true;

	    			$btn.addClass('btn--active').removeClass("btn--disabled");
	    			$btn.siblings().removeClass("btn--active").addClass("btn--disabled");

	    			$cards.not($btn.closest(".card")).find(`.btn[data-type="${type}"]`).addClass('btn--disabled').removeClass("btn--active");

	    			$cards.each(function () {
	    				const $btns = $(this).find(".btn--disabled");
	    				if ($btns.length === 3) {
	    					$btns.each(function () {
	    						const $btn = $(this);
	    						if (!that.currentRound.selected[$btn.data("type")]) {
	    							$btn.removeClass("btn--disabled");
	    						}
	    					})
	    					
	    				}
	    			});
	    		}
    		}
    	},
    	activate: function (done) {
    		console.log("Game activated!");
			this.showNextRound();
    		done();
		}
	};
</script>