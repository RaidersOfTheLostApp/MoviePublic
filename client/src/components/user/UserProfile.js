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
      <Divider />
      <br />
      <Divider />
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
        <Divider />
        <br />
        <Divider />
          <div className='row'>
            <div className='col-4'>
              <Subheader>EDIT YOUR FOLLOWINGS</Subheader>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <Subheader>GENRES</Subheader>
            </div>
          </div>
          <GridList cellHeight={50} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.props.genreFollow.map((genre, i) => (
                <GridTile
                  key={i}
                  title={genre.text}
                >
                  <img src = ""/>
                </GridTile>
            ))}
          </GridList>
          <br />
          <Divider />
          <div className='row'>
            <div className='col-4'>
              <Subheader>MOVIES</Subheader>
            </div>
          </div>
          <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.props.movieFollow.map((movie, i) => (
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
          <br />
          <Divider />
          <div className='row'>
            <div className='col-4'>
              <Subheader>ACTOR/ACTRESSES</Subheader>
            </div>
          </div>
          <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.props.actorFollow.map((movie, i) => (
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
          <Divider />
          <div className='row'>
            <div className='col-4'>
              <Subheader>DIRECTORS</Subheader>
            </div>
          </div>
          <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.props.directorFollow.map((movie, i) => (
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
      </div>
    );
  }
}

export default UserProfile;
