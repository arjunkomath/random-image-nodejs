var express = require('express');
var app = express();
var fs = require('fs');
var Jimp = require("jimp");
var Promise = require('promise');

var port = process.env.PORT || 8080;

var random = function (minimum, maximum) {
    return Math.round( Math.random() * (maximum - minimum) + minimum);
}

app.get('/:width/:height', function (req, res) {
    var w = req.params.width;
    var h = req.params.height;
    if(isNaN(w) || isNaN(h)) {
        res.send('Invalid Width or Height! :(');
                return false;
                }
                var r = random(1,5);
                file = 'images/'+r+'.jpg';
                var promise = new Promise ( function (resolve, reject) {
                    var img = new Jimp(file, function (err, image) {
                        this.resize(Number(w), Number(h)) // resize
                            .write("images/gen.jpg"); // save
                        resolve(1);
                    });
                });
                promise.then( function() {
                    file = 'images/gen.jpg';
                    fs.readFile(file, 'utf8', function (err,data) {
                        if (err) {
                            return console.log(err);
                        }
                        res.writeHead(200, {'Content-Type': 'image/jpg' });
                        // stream the file
                        fs.createReadStream(file, 'utf-8').pipe(res);
                    });
                });
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Yo! App listening at http://%s:%s', host, port);
});
