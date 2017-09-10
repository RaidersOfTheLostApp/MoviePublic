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
        <br />
        <Divider inset={true} />
        <div className='muiThemeProvider'>
          <Subheader>Currently Following:</Subheader>
          <Divider />
          <Subheader>MOVIES</Subheader>
          <List>
            {this.props.movieFollow.map(movie =>
              <ListItem key={movie.id}
                leftIcon={<ActionGrade />}
                primaryText={movie.text}
              />
            )}
          </List>
          <Subheader>GENRES</Subheader>
          <List>
            {this.props.genreFollow.map(genre =>
              <ListItem key={genre.id}
                leftIcon={<ActionGrade />}
                primaryText={genre.text}
              />
            )}
          </List>
          <Subheader>ACTOR/ACTRESSES</Subheader>
          <List>
            {this.props.actorFollow.map(actor =>
              <ListItem key={actor.id}
                leftIcon={<ActionGrade />}
                primaryText={actor.text}
              />
            )}
          </List>
        </div>
      </div>
    );
  }
}

export default UserProfile;

// <Subheader>DIRECTORS</Subheader>
// <List>
//   {this.props.directorFollow.map(director =>
//     <ListItem key={director.id}
//       leftIcon={<ActionGrade />}
//       primaryText={director.text}
//     />
//   )}
// </List>
// <Subheader>SCREENWRITERS</Subheader>
// <List>
//   {this.props.writerFollow.map(writer =>
//     <ListItem key={writer.id}
//       leftIcon={<ActionGrade />}
//       primaryText={writer.text}
//     />
//   )}
// </List>
