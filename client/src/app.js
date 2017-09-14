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
import $ from 'jquery';

// import data from './fakeData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: dataFromServer.favorites,
      favoriteId: [],
      resultsRend: false
    };
  }

  render() {
    console.log(dataFromServer.favorites);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (
            <MuiThemeProvider>
              <Results results = {dataFromServer.movieone} rerender ={this.state.resultsRend} favorites = {this.state.favorites} />
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
                favorites={dataFromServer.favorites}
                movieFollow={dataFromServer.movieFollow}
                genreFollow={dataFromServer.genreFollow}
                actorFollow={dataFromServer.actorFollow}
                directorFollow={dataFromServer.directorFollow}/>
            </MuiThemeProvider>
          )}
          />
          <Route path="/setup" render={() => (
            <MuiThemeProvider>
              <UserSetup user={dataFromServer.user} genres={dataFromServer.genres}/>
            </MuiThemeProvider>
          )}
          />
          <Route path="/following" render={() => (
            <MuiThemeProvider>
              <Following movieFollow={dataFromServer.movieFollow}
                genreFollow={dataFromServer.genreFollow}
                actorFollow={dataFromServer.actorFollow}
                directorFollow={dataFromServer.directorFollow}/>
            </MuiThemeProvider>
          )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
