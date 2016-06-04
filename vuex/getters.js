// This getter is a function which just returns the count
// With ES6 you can also write it as:
// export const getCount = state => state.count

module.exports = {
	getCount: function getCount (state) {
		console.log("getCount", state);
  		return state.count;
  	}
}