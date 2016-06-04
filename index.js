var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var apiEndPoint = 'http://10.10.5.123:8529/';
var pictureDb = 'https://image.tmdb.org/t/p/w185';
var db = 'http://10.10.5.123:8529/_db/_system/off2016/fmk';

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/startgame', function(req, res) {
    request.post(db, { }, function(err, httpResponse, body) {
        var object = JSON.parse(body);
        res.json({
            sid: object._id
        });
    })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});