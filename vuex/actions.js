// An action will receive the store as the first argument.
// Since we are only interested in the dispatch (and optionally the state)
// we can pull those two parameters using the ES6 destructuring feature
module.exports = {
	incrementCounter: function ({ dispatch, state }) {
  		dispatch('INCREMENT', 1);
  	}
}