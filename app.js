var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var awbSecure = require('./secure-info.json');

var app = express();

// MongoDB Server connect.
var dbConnString = "mongodb://" + awbSecure["30rock"]["db"].username + ":" + awbSecure["30rock"]["db"].password + "@" + awbSecure["30rock"]["db"].connloc;

mongoose.connect(dbConnString);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("Connected to mLab");
});

// Express config
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

var server = app.listen(81, function() {
	console.log('Listening on port %d', server.address().port);
});
