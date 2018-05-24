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

    fs.readFile('saved', 'utf8', function (err,data) {
        if (err)
            {
            return console.log(err);
        }
        res.send(data);
        var allData = data.split('\n');

        for(var i = 0; i < allData.length; i++)
        {

        }


        if(true)
        {
            var string = host1 + ',' + host2 + ',' + host3 + ',' + host4 + ',' + port + ',' + output;
            fs.writeFile("saved", string, function (err) {
                if (err) {
                    res.send('Error Saving file');
                }

                res.send('Saved successfully !!');
            });
        }
        else
        {
            res.send('Duplicate port or OutputFile');
        }
    });




});

module.exports = router;
