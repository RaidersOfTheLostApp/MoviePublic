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
import Upcoming from './components/landingpage/Upcoming';
import $ from 'jquery';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

// import data from './fakeData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: dataFromServer.favorites,
      favoriteId: dataFromServer.favoriteId,
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
              <Results results = {dataFromServer.movieone}
                rerender ={this.state.resultsRend}
                favoriteId = {this.state.favoriteId}
                favorites = {this.state.favorites}
                recs = {dataFromServer.recs}/>
            </MuiThemeProvider>
          )}
          />
          <Route path="/favorites" render={() => (
            <MuiThemeProvider>
              <Favorites favorites = {dataFromServer.favorites} favoriteId = {dataFromServer.favoriteId} />
            </MuiThemeProvider>
          )}
          />
          <Route path="/profile" render={() => (
            <MuiThemeProvider>
              <UserProfile user={dataFromServer.user}
                favorites={dataFromServer.favorites}
                favoriteId = {this.state.favoriteId}
                genreFollow={dataFromServer.genreFollow}
                actorFollow={dataFromServer.actorFollow}
                directorFollow={dataFromServer.directorFollow}/>
            </MuiThemeProvider>
          )}
          />
          <Route path="/setup" render={() => (
            <MuiThemeProvider>
              <UserSetup user={dataFromServer.user}
                genres={dataFromServer.genres}
                actors={dataFromServer.actors}
                directors={dataFromServer.directors}
                genreFollow={dataFromServer.genreFollow}
                actorFollow={dataFromServer.actorFollow}
                directorFollow={dataFromServer.directorFollow}
                phone={dataFromServer.phone} />
            </MuiThemeProvider>
          )}
          />
          <Route path="/following" render={() => (
            <MuiThemeProvider>
              <Following genreFollow={dataFromServer.genreFollow}
                actorFollow={dataFromServer.actorFollow}
                directorFollow={dataFromServer.directorFollow}
                genreList={dataFromServer.genres}
                actorList={dataFromServer.actors}
                directorList={dataFromServer.directors}
                vod={dataFromServer.vod_subscriptions}/>
            </MuiThemeProvider>
          )}
          />
          <Route path="/upcoming" render={() => (
            <MuiThemeProvider>
              <Upcoming results = {dataFromServer.movieone} rerender ={this.state.resultsRend} favoriteId = {this.state.favoriteId} favorites = {this.state.favorites} />
            </MuiThemeProvider>
          )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
