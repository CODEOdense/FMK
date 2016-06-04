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
		events: {
			'startGame': function() {
				this.currentView = 'game';
			}
		}
	}
</script>