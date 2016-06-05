const randomName = require('random-name');

function startGame () {
	return new Promise((resolve, reject) => {
		resolve({
			sid: `sid-${Date.now()}`,
			artists: getArtists()
		});
	});
}

function getArtists () {
	return [
		createArtist(),
		createArtist(),
		createArtist()
	];
}

let artistIdIncrement = 0;

function createArtist () {
	return {
		_id: ++artistIdIncrement,
		name: randomName.first() + ' ' + randomName.last(),
		picture: `https://placeimg.com/640/480/people?${artistIdIncrement}`
	};
}

module.exports = {
	startGame
};