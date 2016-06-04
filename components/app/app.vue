<template>
	<component
		:is="currentView"
	></component>
</template>

<script>
	import './app.scss';

	import home from '../home/home.vue';
	import game from '../game/game.vue';

	export default {
		data: function () {
			return {
				currentView: 'home'
			}
		},

		components: {
			home,
			game
		},

		ready: function () {
			

			// Todo: find en måde hvorpå at tilgå den globale app.watch uden en grim timeout
			setTimeout(() => {

				// Watch the state
				app.$watch('sessionId', (newVal, oldVal) => {
					console.info(`Session id changed to ${newVal}. Starting new game...`);
					this.currentView = 'game';
				});
			}, 1000);
		}
	}
</script>