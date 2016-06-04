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
		data() {
			return {};
		},

		components: {
			btn
		}
	};
</script>