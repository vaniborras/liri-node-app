require('dotenv').config();
var fs = require ("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys= require("./keys.js");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var search = process.argv[3];

function  myTweets(){
    var params={
        screen_name: 'vaniborras',
        count: 20,
        result_type: 'recent',
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
       
            for (let i = 0; i < tweets.length; i++) {
                let time = tweets[i].created_at;
                let status = tweets[i].text;
                let tweetNum = i + 1;
                console.log(`\nTweet ${tweetNum}. You tweeted "${status}" \non ${time}\n`)
            }
        }
    });
};

function spotifyThisSong() {
 
    if (!input) {
        spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            let albumName = data.tracks.items[0].album.name;
            let songName = data.tracks.items[0].name;
            let artist = data.tracks.items[0].artists[0].name;
            let previewLink = data.tracks.items[0].external_urls.spotify;
            console.log("\nArtist : " + artist);
            console.log("Song : " + songName);
            console.log("Preview Link: " + previewLink);
            console.log("Album : " + albumName + "\n");
                    });
    } else {
        spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }


            let albumName = data.tracks.items[0].album.name;
            let songName = data.tracks.items[0].name;
            let artist = data.tracks.items[0].artists[0].name;
            let previewLink = data.tracks.items[0].external_urls.spotify;
            console.log("\nArtist : " + artist);
            console.log("Song : " + songName);
            console.log("Preview Link: " + previewLink);
            console.log("Album : " + albumName + "\n");
                    });
    };
};


function movieThis() {
    request(`http://www.omdbapi.com/?t=${userRequest}&apikey=trilogy`, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var parsedBody = JSON.parse(body);
            console.log("\nTitle: " + parsedBody.Title);
            console.log("Year: " + parsedBody.Year);
            console.log("imdb Rating: " + parsedBody.imdbRating);
            console.log("Rotten Tomatoe's rating: " + parsedBody.Ratings[1].Value);
            console.log("Country made in: " + parsedBody.Country);
            console.log("Launguage: " + parsedBody.Language);
            console.log("Plot :" + parsedBody.Plot);
            console.log("Actors :" + parsedBody.Actors + "\n");
        }
    });
}

switch (search) {
    case 'my-tweets':
        myTweets()
        break;
    case 'spotify-this-song':
        spotifyThisSong()
        break;
    case 'movie-this':
        movieThis()
        break;
}