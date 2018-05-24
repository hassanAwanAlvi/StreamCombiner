var express = require('express');
var router = express.Router();


var state = require('./../public/javascripts/state.js');
var server = require('./../public/javascripts/server.js')
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {

    var allDataM = []
    if (fs.existsSync('saved')) {

        fs.readFile('saved', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            var allData = data.split('\n');
            for (var i = 0; i < allData.length; i++) {
                if (allData[i].split(',').length == 6) {

                    allDataM.push(allData[i]);

                }
            }

            res.render('saved', { saved_data: allDataM})

        });

    }
});


router.get('/start', function(req, res, next) {


    var allDataM = []
    if (fs.existsSync('saved')) {

        fs.readFile('saved', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            var allData = data.split('\n');
            for (var i = 0; i < allData.length; i++) {
                if (allData[i].split(',').length == 6) {

                    allDataM.push(allData[i]);

                }
            }




            var index = req.param('index');




            var line = allDataM[index].split(',');
            var host1 = line[0];
            var host2 = line[1];
            var host3 = line[2];
            var host4 = line[3];

            var port = line[4];
            var output = line[5];


            if(state.getPorts().indexOf(port) == -1 && state.getOutputFile().indexOf(output) == -1)
            {
                server.startServer(host1,host2,host3,host4,port,output)
                res.send('See the console for output');
                state.addPort(port);
                state.addOutputFile(output);
            }
            else
            {
                res.send('Duplicate port or OutputFile');
            }

        });

    }



});
module.exports = router;
