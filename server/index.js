var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())


//sample data for testing
const fs = require(`fs`);
// let sampleGenres = require(`../helpers/sample_genres.json`);
// let sampleDiscover = require(`../helpers/sample_discover.json`);

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.get('/search', function(req, res) {
    console.log(`inbound GET request recieved @ "/search" route!`)
    //get the search genre     

    //https://www.themoviedb.org/account/signup

    // use this endpoint to search for movies by genres, you will need an API key

    //https://developers.themoviedb.org/3/discover/movie-discover

    //and sort them by horrible votes using the search parameters in the API
    fs.readFile(require.resolve(`../sample_data/sample_discover.json`), `utf8`, (err, data) => {
        console.log(data);
        res.send(data);
    })

    
})

app.get('/genres', function(req, res) {
    //make an axios request to get the list of official genres

    // from this endpoint https://developers.themoviedb.org/3/genres/get-movie-list which needs your api key

    //send back

    fs.readFile(require.resolve(`../sample_data/sample_genres.json`), `utf8`, (err, data) => {
        console.log(data);
        res.send(data);
    })
})

app.post('/save', function(req, res) {

})

app.post('/delete', function(req, res) {

})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});