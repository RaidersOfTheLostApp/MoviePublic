import React from 'react';
import Results from './Results';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='resultsRoot'>
        <div className='resultsInner'>
          <Results data = {this.props.data}/>
        </div>
      </div>
    );
  }
}

export default LandingPage;
