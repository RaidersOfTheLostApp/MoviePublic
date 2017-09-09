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
import Following from './components/landingpage/Following';

// import data from './fakeData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      favoriteId: [],
      resultsRend: false,
      movieFollowMongoIds: [],
      genreFollowMongoIds: [],
      actorFollowMongoIds: [],
      directorFollowMongoIds: [],
      writerFollowMongoIds: []
    };
  }

  componentDidMount() {
    this.getFollow('movies', movieArr => {
      this.setState({movieFollowMongoIds: movieArr});
    });
    this.getFollow('genres', movieArr => {
      this.setState({genreFollowMongoIds: movieArr});
    });
    this.getFollow('actors', movieArr => {
      this.setState({actorFollowMongoIds: movieArr});
    });
    this.getFollow('directors', movieArr => {
      this.setState({directorFollowMongoIds: movieArr});
    });
    this.getFollow('writers', movieArr => {
      this.setState({writerFollowMongoIds: movieArr});
    });
  }

  getFollow(type, callback) {
    $.ajax({
      method: 'GET',
      url: '/api/profiles/follows/' + type,
      success: (movieArr) => {
        console.log('********* success get follow', movieArr);
        callback(movieArr);
      },
      error: (error) => {
        console.log('************* get follow handleNext ERROR:', error);
      }
    });
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
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (
            <MuiThemeProvider>
              <Results results = {dataFromServer.movieone} rerender ={this.state.resultsRend} addFavorites = {this.addFavorites.bind(this)} />
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
              <UserProfile user={dataFromServer.user}
                movieFollow={dataFromServer.movieFollow}
                genreFollow={dataFromServer.genreFollow}
                actorFollow={dataFromServer.actorFollow}
                directorFollow={dataFromServer.directorFollow}
                writerFollow={dataFromServer.writerFollow}/>
            </MuiThemeProvider>
          )}
          />
          <Route path="/setup" render={() => (
            <MuiThemeProvider>
              <UserSetup user={dataFromServer.user} />
            </MuiThemeProvider>
          )}
          />
          <Route path="/following" render={() => (
            <MuiThemeProvider>
              <Following movieFollow={this.state.movieFollowMongoIds}
                genreFollow={this.state.genreFollowMongoIds}
                actorFollow={this.state.actorFollowMongoIds}
                directorFollow={this.state.directorFollowMongoIds}
                writerFollow={this.state.writerFollowMongoIds}/>
            </MuiThemeProvider>
          )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
