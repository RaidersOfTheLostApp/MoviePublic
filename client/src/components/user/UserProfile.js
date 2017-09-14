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
import {GridList, GridTile} from 'material-ui/GridList';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='muiThemeProvider container'>
        <Subheader>Account Profile</Subheader>
        <div className='row'>
          <div className='col-6'>
            <List>
              <ListItem
                leftIcon={<Avatar src={this.props.user.avatar} />}
                primaryText={this.props.user.display}
                secondaryText="Name"
              />
          </List>
        </div>
        <div className='col-6'>
          <List>
            <ListItem
              insetChildren={true}
              leftIcon={<CommunicationEmail />}
              primaryText={this.props.user.email}
              secondaryText="Email"
            />
          </List>
        </div>
      </div>
      <Divider inset={true} />
      <br />
      <Divider inset={true} />
      <div className='followRoot container'>
        <div className='row'>
          <div className='col-4'>
            <Subheader>EDIT YOUR FAVORITES</Subheader>
          </div>
        </div>
        <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
          {this.props.favorites.map((movie, i) => (
            <a href = {movie.website === 'N/A' ? '#' : movie.website} target = "_blank">
              <GridTile
                key={i}
                title={movie.title}
              >
                <img src = {movie.poster}/>
              </GridTile>
            </a>
          ))}
        </GridList>
      </div>
      <Divider inset={true} />
      <Subheader>EDIT YOUR FOLLOWING</Subheader>
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
      <Subheader>DIRECTORS</Subheader>
      <List>
        {this.props.directorFollow.map(director =>
          <ListItem key={director.id}
            leftIcon={<ActionGrade />}
            primaryText={director.text}
          />
        )}
      </List>
      <Subheader>SCREENWRITERS</Subheader>
      <List>
        {this.props.writerFollow.map(writer =>
          <ListItem key={writer.id}
            leftIcon={<ActionGrade />}
            primaryText={writer.text}
          />
        )}
      </List>
    </div>
    );
  }
}

export default UserProfile;
