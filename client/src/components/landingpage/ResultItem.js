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

class ResultsListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      movieP: this.props.movie
      favorites: [],
      favoriteId: []
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
    var movieId = (movie.id).toString()
    console.log(movieId);
    if (this.state.favoriteId.indexOf(movieId) === -1) {

    $.ajax({
      method: 'POST',
      url: '/api/profiles/addfavorites',
      data: movie,
      success: (user) => {
        console.log('********* success favorites updated for user ' + user);
        var favId = this.state.favoriteId;
        var favorites = this.state.favorites;
        favId.push(movieId);
        favorites.push(movie);
      
        this.setState({
          favorites: favorites,
          favoriteId: favId 
        });
      },
      error: (error) => {
        console.log('************* error updating favorites for user', error);
      }
    });
   }
   else {
    console.log('this favorite is already in the list');

   $.ajax({
      method: 'POST',
      url: '/api/profiles/removefavorites',
      data: movie,
      success: (user) => {
        console.log('********* favorite removed for user ' + user);

        var favId = this.state.favoriteId;
        var favorites = this.state.favorites;
        var favIndex = favId.indexOf(movieId);
        console.log(favIndex);
        favId.splice(favIndex, 1);
        for (var i = 0; i < favorites.length; i++) {
          if (favorites[i].id === movieId) {
            favorites.splice(i, 1);
          }
        }

        this.setState({
          favorites: favorites,
          favoriteId: favId 
        });

      },
      error: (error) => {
        console.log('************* error removing favorite for user ', error);
      }
    })
  }
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites) { 
      var newArray = [];
      for (var i = 0; i < nextProps.favorites.length; i++) {
        newArray.push(nextProps.favorites[i].id);
      }
      this.setState({
        favorites: nextProps.favorites,
        favoriteId: newArray
      });
    }
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
