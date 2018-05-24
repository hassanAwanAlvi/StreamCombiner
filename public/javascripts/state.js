var ports = [];
var outputFileNames = [];
var servers = [];
var commands = [];



exports.addservers = function(servver)
{
    servers.push( servver);
}
exports.getservers = function()
{
    return servers;
}

exports.addOutputFile = function(out)
{
    outputFileNames.push(out);
}
exports.getOutputFile = function()
{
    return outputFileNames;
}

exports.addPort = function(port)
{
    ports.push( port);
}
exports.getPorts = function()
{
    return ports;
}

exports.addcommands = function(port)
{
    commands.push( port);
}
exports.getcommands = function()
{
    return commands;
}

exports.remove = function(index)
{
     ports.splice(index, 1);
     servers.splice(index, 1);
     outputFileNames.splice(index, 1);
    commands.splice(index, 1);

}

