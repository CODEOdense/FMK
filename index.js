var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var shuffle = require('shuffle-array');
var async = require('async')
var pictureDb = 'https://image.tmdb.org/t/p/w185';
/*
var apiEndPoint = 'http://10.10.5.123:8529/';
var db = 'http://10.10.5.123:8529/_db/_system/off2016/fmk';
var victimDb = 'http://10.10.5.123:8529/_db/_system/off2016/victim';
*/
var apiEndPoint = 'http://192.168.57.10:8529/';
var db = 'http://192.168.57.10:8529/_db/_system/off2016/fmk';
var victimDb = 'http://192.168.57.10:8529/_db/_system/off2016/victim';

app.use('/', express.static('public'));
var jsonParser = bodyParser.json();

var Client = require('node-rest-client').Client;

var restclient = new Client();

var args = {
    headers: { "Content-Type": "application/json" }
};

var getArtist = function(callback) {
    request.get(apiEndPoint + '_db/_system/off2016/victim', function(err, httpResponse, body) {
        var artist = JSON.parse(body);
        artist = artist.map(function(artist) {
            artist.picture = pictureDb + '/' + artist.image_path
            return artist;
        });
        callback(artist);
    })
};

app.use('/api/startgame', [jsonParser], function(req, res) {
    var sid = req.body.sid;
    console.log(sid);
    if(sid) {
        console.log("HERE!");
        var round = req.body.round;
        var artistData = req.body.artists;

        request.get(db + '/' + sid, function(err, httpResponse, body) {
            var originalDataset = JSON.parse(body);
            console.log('ORIGINAL: ');
            console.log(originalDataset);
            var dataSet = { };
            if(!dataSet.rounds) {
                dataSet.rounds = { };
            }

            if(originalDataset.rounds) {
                dataSet.rounds = originalDataset.rounds;
            }

            dataSet.rounds[round.toString()] = artistData;

            async.each(artistData, function(item, callback) {
                console.log(victimDb + "/" + item.id + "/" + item.verdict);
                restclient.get(victimDb + "/" + item.id + "/" + item.verdict, {}, function(data, response) {
                    console.log(response);
                    callback(null);
                })
            }, function() {
                restclient.patch(db + '/' + sid, {data: dataSet, headers: {'Content-Type': 'application/json'} }, function(body) {
                    console.log('RESULT: ');
                    console.log(body);
                    getArtist(function(artists) {
                        res.json({
                            sid: sid,
                            artists: artists
                        });
                    });
                })
            })

            console.log('NEW: ');
            console.log(dataSet);

        });
    } else {
        request.post(db, { }, function(err, httpResponse, body) {
            var object = JSON.parse(body);
            getArtist(function(artists) {
                res.json({
                    sid: object._key,
                    artists: artists
                });
            });
        })
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});