import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/landingpage/Navbar';
import UserProfile from './components/user/UserProfile';
import UserSetup from './components/user/UserSetup';
import Results from './components/landingpage/Results';
import Favorites from './components/landingpage/Favorites';

// import data from './fakeData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      favoriteId: [],
    };
  }

getFavoriteIcon(movie) {
  var arr = this.favoriteId;
  return (
  <IconButton onClick={()=>{
  if (arr.indexOf(movie.imdbID) === -1) {
    this.addFavorites(movie);
  }
  }}>
  {movie.imdbID in this.favoriteId ?
    <Favorite color="white" /> :
    <FavoriteBorder color="white" /> 
  }
  </IconButton>
  );
}

addFavorites(movie) {
    this.state.favoriteId.push(movie.imdbID);
    this.state.favorites.push(movie);
    console.log(this.state.favoriteId);
    console.log(this.state.favorites);
}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (
            <MuiThemeProvider>
              <Results results = {dataFromServer.movieone} favoriteId = {this.state.favoriteId} addFavorites = {this.addFavorites.bind(this)} />
            </MuiThemeProvider>
          )}
          />
          <Route path="/favorites" render={() => (
          <MuiThemeProvider>
            <Favorites favorites = {this.state.favorites} />
          </MuiThemeProvider>
          )}
          />    
          <Route path="/profile" render={() => (
            <MuiThemeProvider>
              <UserProfile user={dataFromServer.user} />
            </MuiThemeProvider>
          )}
          />
          <Route path="/setup" render={() => (
            <MuiThemeProvider>
              <UserSetup user={dataFromServer.user} />
            </MuiThemeProvider>
            )}
          />
        </Switch>
      </BrowserRouter>
    )}
}

ReactDOM.render(<App />, document.getElementById('root'));












