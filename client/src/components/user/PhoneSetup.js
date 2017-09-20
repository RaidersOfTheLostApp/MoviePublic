import React from 'react';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

class PhoneSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }

  render() {
    return (
      <div>
        <div className='vod container'>
          <div className='row'>
            <div className='col'>
              <Subheader>{this.props.header}</Subheader>
            </div>
          </div>
        </div>
        <div className='vod container'>
          <div className='row'>
            <div className='col'>
              <TextField
                hintText="Enter a 10-Digit Mobile Number"
                onChange={this.props.handleInput}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneSetup;
