var express = require('express');
var router = express.Router();
var state = require('./../public/javascripts/state.js');


/* GET users listing. */
router.get('/', function(req, res, next) {

    res.render('status', { ports: state.getPorts(),
        output :  state.getOutputFile()})

  //   var returnString = '';
  //   for(var i = 0 ; i < state.getPorts().length; i++)
  //   {
  //       returnString += state.getPorts()[i] + "   " + state.getOutputFile()[i] + "\n";
  //   }
  // res.send(returnString);


});

module.exports = router;
