import React from 'react';
import ReactPlayer from 'react-player';

class DemoVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='demoVideo'>
        <ReactPlayer url='https://www.youtube.com/watch?v=ZUG9qYTJMsI' playing />
      </div>
    );
  }
}

export default DemoVideo;
// ReactDOM.render(<UserProfile />, document.getElementById('profile'));
