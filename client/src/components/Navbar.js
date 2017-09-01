import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return ( 
      <Toolbar
        style={{
          backgroundColor: 'white',
          width: '100%',
          paddingTop: '30px'
        }}
      >
        <ToolbarGroup firstChild={true}>
          <div style={{
            padding: '0 25px 0 30px'
          }}>
          </div> 
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingRight: '15px',
              alignItems: 'center'
            }}
          >
            <RaisedButton 
              label="View Trips"
              style={{marginRight: '3px'}}
            />
            <RaisedButton
              label="Create Trip"
            />
          </div>
          <div style={{paddingRight: '30px'}}>
          </div>
        </ToolbarGroup> 
      </Toolbar>
    );
  }
}

export default Navbar;