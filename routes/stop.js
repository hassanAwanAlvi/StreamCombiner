var express = require('express');
var router = express.Router();
var state = require('./../public/javascripts/state.js');

var HLSServer = require('hls-server')
var http = require('http')
var ffmpeg = require('fluent-ffmpeg');

/* GET users listing. */
router.get('/', function(req, res, next) {


    var index = req.param('index');

    var server = state.getservers()[index];
    server.close();

     var commands = state.getcommands()[index];
     commands.kill();



    console.log(req.param('index'));
    state.remove(index);
    res.redirect('/status');

});

module.exports = router;
