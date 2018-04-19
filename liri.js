require("dotenv").config();
var fs = require ("fs");

fs.readFile (".env", "utf8", function(err, data){
    if (err)
    return console.log (err);
});

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
