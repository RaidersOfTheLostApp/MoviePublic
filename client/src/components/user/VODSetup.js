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
        // use Table & Toggle from MUI
        // netflix, hbo go, hulu, amazon video
        // toggle for turned on
        // table to display with logos
        {this.props.header}
      </div>
    );
  }
}

export default VODSetup;
