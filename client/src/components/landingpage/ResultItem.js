import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Search from './Search';
import Filtering from './Filtering';
import Results from './Results';
import MovieDataModal from './MovieDataModal.js';

const customContentStyle = {
  backgroundColor: '#1a1aff',
  width: '60%',
  maxWidth: 'none',
  fontFamily: 'Roboto, sans-serif',
};

const customTitleStyle = {
  // backgroundColor:'#50B6C2',
  backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#3D8DB5),to(#5583B5))',
  backgroundImage: '-webkit-linear-gradient(top, #3D8DB5 0%,#5583B5 100%)',
  backgroundImage: '-o-linear-gradient(top, #3D8DB5 0%,#5583B5 100%)',
  backgroundImage: 'linear-gradient(to bottom, #3D8DB5 0%,#5583B5 100%)',

};

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '100%',
    height: '100%'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class ResultsListItem extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      favoriteId: [],
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  getFavoriteIcon(movie) {
    var arr = this.state.favoriteId;
    return (
      <IconButton onClick={()=>{
        this.addFavorites(movie);
      }}>
        {movie.imdbID in this.state.favoriteId ?
          <Favorite color="white" /> :
          <FavoriteBorder color="white" />
        }
      </IconButton>
    );
  }

  addFavorites(movie) {
    $.ajax({
      method: 'POST',
      url: '/api/profiles/addfavorites',
      data: movie,
      success: (user) => {
        console.log('********* success favorites updated for user ' + user);
      },
      error: (error) => {
        console.log('************* error updating favorites for user', error);
      }
    });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidUpdate() {
    this.render();
  }

  render() {
    return (
      <div>
        <GridTile
          key={this.props.k}
          subtitle={<span>by <b>{this.props.movieP.directors}</b></span>}
          title={this.props.movieP.title}
          actionIcon={this.getFavoriteIcon(this.props.movieP)}
        >
          <img src={this.props.movieP.poster} onClick={this.openModal} height="100%" width="100%"/>
        </GridTile>
        <MovieDataModal closeModal={this.closeModal} openModal={this.openModal} movieP={this.props.movieP} modalIsOpen={this.state.modalIsOpen} />
      </div>
    );
  }
}

export default ResultsListItem;
