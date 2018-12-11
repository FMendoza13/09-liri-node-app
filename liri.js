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

var nodeArgs = process.argv;
var userInput = "";

// For user input re: song/artist/movie name
// Loop begins at process.argv[3]
for (var i = 3; i < nodeArgs.length; i++) {
        // userInput for multiple words
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "%20" + nodeArgs[i];
    }
    // else if userInput is 1 word
    else {
        userInput += nodeArgs[i];
    }
}


var command = process.argv[2];
switch(userCommand){
    case "concert-this":
    // run request for bandsintown with specific artist
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
        request(queryURL, function (error, response, body) {
            // if no error and response
            if (!error && response.statusCode === 200) {
                // parse json
                var data = JSON.parse(body);
                for(var i = 0; i < data.length; i++){
                    console.log("Venue: " + data[i].venue.name);
                    if(data[i].venue.region == ""){
                        data[i].venue.region = data[i].venue.country;
                    }
                    console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region);
                    console.log("----------------")
                }
            }
        });
        break;
    case "spotify-this-song":
        console.log("spotify-this-song");
        break;
    case "movie-this":
        console.log("movie-this");
        break;
    case "do-what-it-says":
        console.log("do-what-it-says");
        break;
}