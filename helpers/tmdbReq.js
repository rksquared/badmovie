const requestP = require('request-promise-native')

const {apiKey} = require(`../server/api.js`);

const getGenresTMDB = (cb) => {
  return requestP(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then((res) => {
      cb(res)
    })
    .catch((err) => {
      console.error(`You're getting errors from your TMDB genre query: ${err}`)
    })
}

const discoverBadMovies = (genre, cb) => {
  let queryString = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&release_date.lte=2018-04-08&vote_count.gte=50&with_genres=${genre}`;

  return requestP(queryString)
    .then((res) => {
      cb(res)
    })
    .catch((err) => {
      console.error(`You're getting errors from your TMBD discover query: ${err}`);
    })
}


module.exports.getGenresTMDB = getGenresTMDB;
module.exports.discoverBadMovies = discoverBadMovies;



//write tmdb search request 
  //pass in api key
  //pass in query ---> from server get "/search" route ---> from client GET?
