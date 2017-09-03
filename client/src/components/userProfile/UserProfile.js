import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='muiThemeProvider'>
        <Subheader>Account Profile</Subheader>
        <List>
          <ListItem
            leftIcon={<Avatar src={this.props.user.avatar} />}
            primaryText={this.props.user.display}
            secondaryText="Name"
          />
          <ListItem
            insetChildren={true}
            leftIcon={<CommunicationEmail />}
            primaryText={this.props.user.email}
            secondaryText="Email"
          />
        </List>
        <Divider inset={true} />
        <List>
          <ListItem
            leftIcon={<ActionGrade />}
            primaryText="movie list goes here"
            secondaryText="Favorite Movies"
          />
        </List>
      </div>
    );
  }
}

export default UserProfile;
