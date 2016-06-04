<template>
	<div class="home">
		<button @click='startGame'>Start</button>
	</div>
</template>

<script>
	import './home.scss';

	export default {
		methods: {
    		startGame: function () {
				/*this.$http({url: '/startGame', method: 'GET'}).then(
					{ sessionId, artists } => {
						console.log(sessionId, artists);
					}, response => {
						console.error(response);
					}
				);*/
    		}
		}
	};
</script>