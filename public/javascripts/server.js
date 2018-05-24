var HLSServer = require('hls-server')
var http = require('http')
var ffmpeg = require('fluent-ffmpeg');
var state = require('./state.js');

var serverStarted = false;
var success = false;
var error = false;

var Gport = '';
exports.startServer = function(host1, host2, host3, host4, port, output) {

Gport = port;
    var server = http.createServer();

    var hls = new HLSServer(server,
        {
            dir: 'public/videos/'  // Directory that input files are stored
        });

   // nullsrc=size=640x480

    var command =  ffmpeg();
    command.input(host1).input(host2).input(host3).input(host4).addOptions([
        '-filter_complex', 'color=s=646x486:c=red [base]; [0:v] setpts=PTS-STARTPTS, scale=320x240 [upperleft]; [1:v] setpts=PTS-STARTPTS, scale=320x240 [upperright]; [2:v] setpts=PTS-STARTPTS, scale=320x240 [lowerleft]; [3:v] setpts=PTS-STARTPTS, scale=320x240 [lowerright]; [base][upperleft] overlay=shortest=1:x=2:y=2 [tmp1]; [tmp1][upperright] overlay=shortest=1:x=324:y=2 [tmp2]; [tmp2][lowerleft] overlay=shortest=1:y=244:x=2 [tmp3]; [tmp3][lowerright] overlay=shortest=1:x=324:y=244',
        '-c:v libx264',
        '-c:a aac',
        '-ac 1',
        '-strict -2',
        '-crf 18',
        '-profile:v baseline',
        '-maxrate 400k',
        '-bufsize 1835k',
        '-pix_fmt yuv420p',
        '-hls_time 10',
        '-hls_list_size 6',
        '-hls_wrap 5',
        '-start_number 1'
    ]).output('public/videos/' +output+'.m3u8').on('codecData', successCallback).on('error', errorCallback).run();


    serverStarted = false;
    server.listen(port);
    state.addservers(server)
    state.addcommands(command)



}

function successCallback() {

    console.log("Server has started on port " + Gport);
    serverStarted = true;
    success = true;

}

function errorCallback(error, std, sta) {
    console.log("Error" + + error.message);
    serverStarted = true;
    error = true;

}

