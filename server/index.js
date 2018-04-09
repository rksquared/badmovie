const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {getAllFavorites, saveFavorite, deleteFavorites} = require(`./database`);

const {getGenresTMDB, discoverBadMovies} = require(`../helpers/tmdbReq`);

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())


//sample data for testing
// const fs = require(`fs`);
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
    // fs.readFile(require.resolve(`../sample_data/sample_discover.json`), `utf8`, (err, data) => {
    //     // console.log(data);
    //     res.send(data);
    // })

    let genre = req.query.genre;

    console.log(`genre being passed to discovery API request: ${genre}`)

    discoverBadMovies(genre, (data) => {
        res.send(data);
    });

    
})

app.get('/genres', function(req, res) {
    console.log(`inbound GET request recieved @ "/genres" route!`)

    getGenresTMDB((data) => {
        res.send(data);
    });
})

app.get(`/favorites`, function(req, res) {
    console.log(`fetching all favorites from MOVIES table in DB`);

    getAllFavorites((err, results) => {
        if (err) {return console.error(`there was an error retrieving all favorites from DB: ${err}`)}
        console.log(`Success! Here are all the favorites: ${JSON.stringify(results)}`);
        res.send(JSON.stringify(results));
    });
})

app.post('/save', function(req, res) {
    let movie = req.body.movie;

    console.log('movie to be saved: ', movie.title);

    saveFavorite(movie, (err, results) => {
        if (err) {return console.error(`Uh oh! There was an error setting ${movie} in the DB: ${err}`);}
        console.log(`Success! You saved a new favorite movie: ${movie.title}`)
        res.end('ROMA VICTA');
    })

})

app.post('/delete', function(req, res) {
    let movieId = req.body.movie.id;
    let movieTitle = req.body.movie.title;

    console.log('movie to be delted: ', movieTitle);

    deleteFavorites(movieId, (err, results) => {
        if (err) {return console.error(`Uh oh! There was an error trying to delete ${movieTitle} from the DB: ${err}`);}
        console.log(`Success! ${movieTitle} was deleted from DB`);
        res.send(`ROMA VICTA`);
    })

})
app.listen(3000, function() {
    console.log('listening on port 3000!');
});