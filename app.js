var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var app = express();

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(cookieParser());
app.use(compression());

app.get('/', function(req,res) {
	res.sendfile('./public/vote.html');
});

app.get('/results', function(req,res) {
	res.sendfile('./public/results.html');
});

var server = app.listen(85, function() {
	console.log('Listening on port %d', server.address().port);
});
