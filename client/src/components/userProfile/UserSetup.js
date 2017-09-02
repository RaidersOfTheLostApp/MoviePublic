import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='muiThemeProvider'>
        <Subheader>New Account Setup</Subheader>
        <List>
          <ListItem
            leftIcon={<Avatar src={this.props.user.avatar} />}
            primaryText={this.props.user.display}
            secondaryText="Name"
          />
        </List>
        <Divider />
      </div>
    );
  }
}

export default UserProfile;
// ReactDOM.render(<UserProfile />, document.getElementById('profile'));
