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
        desc: `WHOSVILLE`}],
      showFaves: false
  	}

    this.getMovies = this.getMovies.bind(this)
    // whats missing?
    this.swapFavorites = this.swapFavorites.bind(this)
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  getMovies() {
    //make an axios request to your server on the GET SEARCH endpoint
    Axios.get(`/search`)
    .then(({data}) => {
      console.log(`Successful GET request on server "/search" route; response data: ${JSON.stringify(data.results[0])}`);
      let movies = data.results.reduce((movieList, movie) => (movieList.push({
        id: movie.id,
        title: movie.title, 
        year: movie.release_date.slice(0, 4), 
        rating: movie.vote_average,
        desc: movie.overview,
        thumbnail: movie.poster_path,
        favorite: false}), 
        movieList), 
        []);

      console.log(`structured movies for storage in state, sample: ${JSON.stringify(movies[0])}`);

      this.setState({
        movies: movies
      });
    })
  }

  saveMovie() {
    //same as above but do something diff
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
  }



  render () {
  	return (
    <div className="app">
      <header className="navbar"><h1>Bad Movies</h1></header> 
      
      <div className="main">
        <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
        <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));