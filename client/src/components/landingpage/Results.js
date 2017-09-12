import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import Search from './Search';
import Filtering from './Filtering';
import ResultsListItem from './ResultItem';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteId: [],
      favorites: [],
      movies: this.props.results
    };
    this.searchToServer = this.searchToServer.bind(this);
  }

  searchToServer(cb) {
    var searchInput = document.getElementById('text-field').value;
    console.log(searchInput);
    $.ajax({
      url: '/search',
      method: 'GET',
      data: {value: searchInput},
      dataType: 'json',
      contentType: 'text/plain',
      success: (results) => {
        var container = [];
        for (var i = 0; i < results.length; i++) {
          container.push(results[i]);
        }
        // this.setState({movies: this.state.movies.concat(results)});
        this.setState({
          movies: container
        });

        // console.log(this.state.movies, '@#$#@$#@');
        // this.render();
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  componentDidUpdate() {
    this.render();
  }

  // addFavorites(movie) {
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/profiles/addfavorites',
  //     data: movie,
  //     success: (user) => {
  //       // user = JSON.parse(user);
  //       console.log('********* success favorites updated for user ' + user);
  //     },
  //     error: (error) => {
  //       console.log('************* error updating favorites for user', error);
  //     }
  //   });
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   if (nextProps.favorites) { 
  //     var newArray = [];
  //     for (var i = 0; i < nextProps.favorites.length; i++) {
  //       newArray.push(nextProps.favorites[i].id);
  //     }
  //     this.setState({
  //       favorites: nextProps.favorites,
  //       favoriteId: newArray
  //     });
  //   }
  // }

  render() {
    return (
      <div className='gridRoot container'>
        <div className='row'>
          <div className='col-md-6'>
            <Search searchToServer={this.searchToServer}/>
          </div>
          <div className='col-md-6'>
            <Filtering />
          </div>
        </div>
        <GridList
          cellHeight='auto'
          cols={5}
          className='gridList'>
          <Subheader>Popular Movies</Subheader>
          {(this.state.movies).map( (movie, i) => (
            <ResultsListItem
              key={i}
              movieP={movie}
              favorites = {this.props.favorites}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

export default Results;
