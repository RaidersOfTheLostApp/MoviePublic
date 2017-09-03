import React from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

class VODSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='demoVideo'>
        <Subheader>{this.props.header}</Subheader>
        <div className='vod'>
          <Toggle className='toggle' label='Netflix' />
          <Toggle className='toggle' label='HBO GO' />
          <Toggle className='toggle' label='Hulu' />
          <Toggle className='toggle' label='Amazon Video' />
        </div>
        // use Table?
        // table to display with logos
      </div>
    );
  }
}

export default VODSetup;
