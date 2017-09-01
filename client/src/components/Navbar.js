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
      <Toolbar className='toolBar'>
        <ToolbarGroup firstChild={true}>
          <div className='toolBarGroupFirst'>
          </div>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <div className='toolBarGroupLast'>
            <RaisedButton label="View Trips" className='raisedButton'/>
            <RaisedButton label="Create Trip" />
          </div>
          <div className='toolBarPadding'>
          </div>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Navbar;
