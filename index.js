var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var shuffle = require('shuffle-array');

var apiEndPoint = 'http://10.10.5.123:8529/';
var pictureDb = 'https://image.tmdb.org/t/p/w185';
var db = 'http://10.10.5.123:8529/_db/_system/off2016/fmk';

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

var getArtist = function(callback) {
    request.get(apiEndPoint + '_db/_system/off2016/cast', function(err, httpResponse, body) {
        var artist = JSON.parse(body);
        var data = artist.filter(function(artist) {
            if(artist.image_path) {
                artist.image = pictureDb + artist.image_path;
                return artist;
            }
        });

        console.log(data);
        data = shuffle.pick(data, {'picks': 3});
        callback(data);
    })
};

app.use('/api/startgame', function(req, res) {
    request.post(db, { }, function(err, httpResponse, body) {
        var object = JSON.parse(body);
        getArtist(function(artists) {
            res.json({
                sid: object._id,
                artists: artists
            });
        });
    })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});