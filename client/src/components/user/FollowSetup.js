import React from 'react';
import Subheader from 'material-ui/Subheader';

class FollowSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='demoVideo'>
        <Subheader>{this.props.header}</Subheader>
        // use Auto Complete & Select Field from MUI
        // select field for dropdown of actor, director, writer, movies
        // autocomplete to autofill text from our db and allow new entries
        // display sections of 'current follows' broken into sections with delete keys

      </div>
    );
  }
}

export default FollowSetup;
