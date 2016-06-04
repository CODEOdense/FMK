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
    			setTimeout(() => {
    				app.sessionId = "todo: set ny sessionId";
    			}, 100);
    			
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
    			this.startGame();
			}
    	}
	};
</script>