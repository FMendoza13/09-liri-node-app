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
// 03413532acb847658fdaa719500480e1
// secret: 19f860df0df64dbd82ce33c2d560d3ae

var userCommand = process.argv[2];
switch(userCommand){
    case "concert-this":
    // run request for bandsintown with specific artist
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
        request(queryURL, function (error, response, body) {
            // if no error and response
            if (!error && response.statusCode === 200) {
                // parse json
                var data = JSON.parse(body);
                // look within array
                for(var i = 0; i < data.length; i++){
                    // get venue name
                    console.log("Venue: " + data[i].venue.name);
                    // venue location
                    // if statement for concerts
                    if (data[i].venue.region == "") {
                        console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                    } else {
                        console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                    }
                }
                // Date of show
                var date = data[i].datetime; 
                date = moment(date).format("MM/DD/YYYY");
                console.log("Date: " + date)
                console.log("----------------")
            }
        
        });
        break;
    case "spotify-this-song":
        // console.log("spotify-this-song");
        spotify.search({ type: "track", query: userInput}, function(err, data){
            if(err){
                console.log("Error occured: " + err)
            }
            // Designate data to variable
            var info = data.tracks.items
            //For loop through elements in array
            for (var i = 0; i < info.length; i++) {
                //store albumObject to variable 
                var albumObject = info[i].album;
                var trackName = info[i].name
                var preview = info[i].preview_url
                //Artist array to variable
                var artistsInfo = albumObject.artists
                //Loop through array of artists 
                for(var j = 0; j < artistsInfo.length; j++){
                    console.log("Artist: " + artistsInfo[j].name)
                    console.log("Song Name: " + trackName)
                    console.log("Preview of Song: " + preview)
                    console.log("Album Name: " + albumObject.name)
                    console.log("\n")
                }
            }
        })
        break;
    case "movie-this":
        // console.log("movie-this");

        var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
        request(queryURL, function (error, response, body) {
             if (!error && response.statusCode === 200) {
                 var info = JSON.parse(body);
                 console.log("Title: " + info.Title)
                 console.log("Release Year: " + info.Year)
                 console.log("IMDB Rating: " + info.Ratings[0].Value)
                 console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value)
                 console.log("Country: " + info.Country)
                 console.log("Language: " + info.Language)
                 console.log("Plot: " + info.Plot)
                 console.log("Actors: " + info.Actors)
             }
        });
        break;
    
}

    if (userCommand == "do-what-it-says"){
        var fs = require("fs");
        fs.readFile("random.txt", "utf8", function (error, data){
            if (error) {
                return console.log(error)
            }
            var textArr = data.split(",");
            userCommand = textArr[0]
            userInput = textArr[1]
            runLiri();
        })
    }

    runLiri();