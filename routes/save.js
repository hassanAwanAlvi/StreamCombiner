var express = require('express');
var router = express.Router();

var state = require('./../public/javascripts/state.js');
var server = require('./../public/javascripts/server.js')
var fs = require('fs');

router.get('/', function(req, res, next)
{
    var host1 = req.param('link1');
    var host2 = req.param('link2');
    var host3 = req.param('link3');
    var host4 = req.param('link4');

    var port = req.param('port');
    var output = req.param('output');

    var string = host1 + ',' + host2 + ',' + host3 + ',' + host4 + ',' + port + ',' + output + '\n';

    if (!fs.existsSync('saved')) {

        fs.writeFile("saved", string, function (err) {
            if (err) {
                res.send('Error Saving file');
                return;
            }

            res.send('Saved successfully !! <br><br> <a href="/"> Go Back Home</a>');
            return;
        });

    }
    else {
        fs.readFile('saved', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var allData = data.split('\n');

            for (var i = 0; i < allData.length; i++) {
                if (allData[i].split(',').length == 6) {
                    if (allData[i].split(',')[4] == port || allData[i].split(',')[5] == output) {
                        res.send('Duplicate port or OutputFile');
                        return;
                    }
                }
            }


            fs.appendFile("saved", string, function (err) {
                if (err) {
                    res.send('Error Saving file');
                    return;
                }

                res.send('Saved successfully !! <br><br> <a href="/"> Go Back Home</a>');
                return;
            });

        });
    }


});

module.exports = router;
