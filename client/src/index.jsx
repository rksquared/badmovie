import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Axios from 'axios'
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{
        id: 9203840923418,
        title: `DE WAY`, 
        year: `2090`, 
        rating: `OVER 9000`,
      }],
      selectedMovies: [],
      showFaves: false
  	}

    this.getMovies = this.getMovies.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.selectMovie = this.selectMovie.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  getMovies(genre) {
    console.log(`genre being passed in getMovies: ${genre}`);
    Axios.get(`/search?${genre ? `genre=${genre}` : `genre=28`}`)
    .then(({data}) => {
      console.log(`Successful GET request on server "/search" route; response data: ${JSON.stringify(data.results[0])}`);
      let movies = data.results.reduce((movieList, movie) => (movieList.push({
        id: movie.id,
        title: movie.title, 
        year: movie.release_date.slice(0, 4), 
        rating: movie.vote_average,
        thumbnail: movie.poster_path}), 
        movieList), 
        []);

      console.log(`structured movies for storage in state, sample: ${JSON.stringify(movies[0])}`);

      this.setState({
        movies: movies
      });
    })
  }

  getFavorites() {
    Axios.get('/favorites')
      .then(({data}) => {
        console.log(`retrieved favorites from DB: ${data}`);
        this.setState({
          favorites: data
        });
      })
  }

  saveMovie(movie) {
    //same as above but do something diff
    Axios.post(`/save`, {movie: movie})
      .then((data) => {
        console.log(`data recieved from save: ${data}`);
        this.getFavorites();
      })
  }

  deleteMovie() {
    //same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    })
  }

  componentDidMount() {
    console.log(`application mounted!`);

    this.getMovies();

    // this.getFavorites();

  }

  selectMovie(movie) {
    console.log(`selected movie ${movie.title}`);

    let selectedMovies = this.state.selectedMovies.slice();

    selectedMovies.push(movie);

    this.setState({
      selectedMovies: selectedMovies
    });
  }


  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      
      <div className="main">
        <Search 
          swapFavorites={this.swapFavorites} 
          showFaves={this.state.showFaves}
          searchHandler={this.getMovies}
        />
        <Movies 
          selectedMovies={this.state.selectedMovies} 
          selectHandler={this.selectMovie}
          saveHandler={this.saveMovie} 
          movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
          showFaves={this.state.showFaves}
        />
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));