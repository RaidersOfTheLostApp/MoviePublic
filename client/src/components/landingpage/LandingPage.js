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
      showFavorites: false
    };
  }

   onButtonClick() {
    console.log(this.state.showFavorites);
    this.setState({
      showFavorites: true
    });
  }

  render() {
    return (
      <div className='muiThemeProvider'>
        <div className='resultsRoot'>
          <div className='resultsInner'>
            <Navbar buttonClick={this.onButtonClick.bind(this)} />
            <Search />
            {this.state.showFavorites ? 
            <Favorites favorites = {this.props.favorites}/>
            :
            <Results results = {this.props.results}/>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
