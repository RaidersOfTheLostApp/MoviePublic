import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './components/landingpage/LandingPage';
import Navbar from './components/landingpage/Navbar';
import UserProfile from './components/userProfile/UserProfile';
// import data from './fakeData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => (
            <MuiThemeProvider>
              <LandingPage data = {dataFromServer.movies} />
            </MuiThemeProvider>
          )}
          />
          <Route path="/profile" render={() => (
            <MuiThemeProvider>
              <UserProfile user={dataFromServer.user} />
            </MuiThemeProvider>
          )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// export default App;
