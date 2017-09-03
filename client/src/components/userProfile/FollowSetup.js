import React from 'react';

class FollowSetup extends React.Component {
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

export default FollowSetup;
// ReactDOM.render(<UserProfile />, document.getElementById('profile'));
