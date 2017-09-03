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
        // user Auto Complete & Select Field from MUI
        // select field for dropdown of actor, director, writer, movies
        // autocomplete to autofill text from our db and allow new entries
        // display sections of 'current follows' broken into sections with delete keys
        {this.props.header}
      </div>
    );
  }
}

export default FollowSetup;
