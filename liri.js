// sets environment variables with dotenv
require("dotenv").config();

// require key.js file
var keys = require("./keys.js");

// require npm request
var request = require("request")

// require spotify npm
var Spotify = require('node-spotify-api');

// save spotify key to variable
var spotify = new Spotify(keys.spotify);

// require moment npm
var moment = require('moment');
moment().format();

var fs = require("fs")
