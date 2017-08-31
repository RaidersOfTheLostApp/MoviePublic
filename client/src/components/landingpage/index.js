import React from 'react';
import Results from './results';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
    <div style={{flexGrow: 2, flexBasis: '67%'}}>
    <div style={{
	 height: '87%',
	 overflowY: 'scroll'
    }}>
    <Results data = {this.props.data}/>
    </div>
    </div>
    )
  }
}

export default LandingPage;