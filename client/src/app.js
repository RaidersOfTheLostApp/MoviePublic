import React from 'react';
import ReactDOM from 'react-dom';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './components/landingpage/LandingPage';
import data from './fakeData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className='muiThemeProvider'>
          <LandingPage data = {this.props.data} />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App data = {data}/>, document.getElementById('root'));

export default App;
