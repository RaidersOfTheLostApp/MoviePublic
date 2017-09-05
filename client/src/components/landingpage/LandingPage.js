import React from 'react';
import Results from './Results';
import Search from './Search';
import Navbar from './Navbar';
import Favorites from './Favorites';
// import Navbar from './Navbar';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFavorites: false,
      favorites: [],
      favoriteId: []
    };
  }

  onButtonClick() {
    console.log(this.state.showFavorites);
    this.setState({
      showFavorites: true
    });
  }

  addFavorites(movie) {
    console.log(this.state.favorites);
    this.state.favoriteId.push(movie.imdbID);
    var arr = this.state.favorites;
    arr.push(movie);
    this.setState({
      favorites: arr
    })
  }


  render() {
    return (
      <div className='muiThemeProvider'>
        <div className='resultsRoot'>
          <div className='resultsInner'>
            <Navbar buttonClick={this.onButtonClick.bind(this)} />
            <Search />
            {this.state.showFavorites ? 
            <Favorites favorites = {this.state.favorites}/>
            :
            <Results results = {this.props.results} favoriteId = {this.state.favoriteId} addFavorites = {this.addFavorites.bind(this)}/>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
