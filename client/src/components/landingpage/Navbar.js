import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Favorites from './Favorites';
import Search from './Search';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className='muiThemeProvider'>
          <Toolbar className='toolBar'>
            <ToolbarGroup firstChild={true}>
              <div className='toolBarGroupFirst'>
              </div>
            </ToolbarGroup>
            <ToolbarGroup lastChild={true}>
              <div className='toolBarGroupLast'>
                <a href="/" ><RaisedButton label="Home" /></a>
                <a href="/favorites"><RaisedButton label="Favorites" /></a>
                <a href="/following"><RaisedButton label="Following" /></a>
                <a href="/profile"><RaisedButton label="Profile" /></a>
                <a href="/setup"><RaisedButton label="Setup" /></a>                                                                                            
                <a href="/logout"><RaisedButton label="Logout" /></a>
              </div>
              <div className='toolBarPadding'>
              </div>
            </ToolbarGroup>
          </Toolbar>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Navbar />, document.getElementById('nav'));
