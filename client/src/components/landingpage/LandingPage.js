import React from 'react';
import Results from './Results';
import Search from './Search';
// import Navbar from './Navbar';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='resultsRoot'>
        <div className='resultsInner'>
          <Search />
          <Results data = {this.props.data}/>
        </div>
      </div>
    );
  }
}

export default LandingPage;
