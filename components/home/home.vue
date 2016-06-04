<template>
	<div class="home">
		<h1>Fuck, Marry, Kill!</h1>
		<btn text="Start"></btn>
	</div>
</template>

<script>
	import './home.scss';

	import btn from '../button/button.vue';

	export default {
		components: {
			btn
		},
		methods: {
    		startGame: function () {
    			console.info(`Requesting a new session id`);
    			
				$.ajax({
					url: '/api/startGame',
					method: 'GET'
				}).then(function (response) {
					app.sessionId = response.sid;
					app.currentRound = {
						selected: {},
						artists: response.artists
					};
					app.rounds = [app.currentRound];
				});
    		}
    	},
    	events: {
    		'btn-click': function () {
    			this.startGame();
			}
    	}
	};
</script>