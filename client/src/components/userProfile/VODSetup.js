import React from 'react';

class VODSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='demoVideo'>
        {this.props.header}
      </div>
    );
  }
}

export default VODSetup;
// ReactDOM.render(<UserProfile />, document.getElementById('profile'));
