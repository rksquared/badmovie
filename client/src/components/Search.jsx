import React from 'react';
import Axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: '',
    }

    this.getGenres = this.getGenres.bind(this);
    this.setSelectedGenre = this.setSelectedGenre.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    Axios.get(`/genres`)
      .then(({data}) => {
        console.log(`a sample genre from @ GET "/genres" server route response: ${JSON.stringify(data.genres[0])}`);

        let genres = data.genres.reduce((genreList, genre) => (genreList.push(genre), genreList), []);

        this.setState({
          genres: genres,
          selectedGenre: genres[0].id
        });
      })
  }

  componentDidMount() {
    console.log(`search component mounted!`);

    this.getGenres();
  }

  setSelectedGenre({target}) {
    console.log('selecting this genre:', target.value);
    this.setState({
      selectedGenre: target.value
    });
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        <select onChange={this.setSelectedGenre}>
          {this.state.genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br/><br/>

        <button onClick={() => this.props.searchHandler(this.state.selectedGenre)}>Search</button>

      </div>)
  }
}

export default Search