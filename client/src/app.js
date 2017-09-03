import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './components/landingpage/LandingPage';
import Navbar from './components/landingpage/Navbar';
import UserProfile from './components/userProfile/UserProfile';
import UserSetup from './components/userProfile/UserSetup';

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
              <LandingPage data={dataFromServer} />
            </MuiThemeProvider>
          )}
          />
          <Route path="/profile" render={() => (
            <MuiThemeProvider>
              <UserProfile user={dataFromServer} />
            </MuiThemeProvider>
          )}
          />
          <Route path="/setup" render={() => (
            <MuiThemeProvider>
              <UserSetup user={dataFromServer} />
            </MuiThemeProvider>
          )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
