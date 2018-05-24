var express = require('express');
var router = express.Router();
var state = require('./../public/javascripts/state.js');
var server = require('./../public/javascripts/server.js')
router.get('/', function(req, res, next)
{
    var host1 = req.param('link1');
    var host2 = req.param('link2');
    var host3 = req.param('link3');
    var host4 = req.param('link4');

    var port = req.param('port');
    var output = req.param('output');


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

module.exports = router;
