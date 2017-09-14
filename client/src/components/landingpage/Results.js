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
      movies: this.props.results,
      minRating: 0
    };

    this.sortByRating = this.sortByRating.bind(this);
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

  filterByRating(array) {
    var output = [];
    var end = [];
    array.map( value => {
      if (value.ratings[0]) {
        var score = value.ratings[0].Value.split('/')[0];
        var num = parseFloat(score);
        console.log(this.state.minRating, 'rating');
        if (num >= this.state.minRating) {
          output.push(value);
        } else {
          end.push(value);
        }
      }
    });
    return output.concat(end);
  }

  sortByRating(rating) {
    this.setState({
      minRating: rating
    }, () => {
      var filtered = this.filterByRating(this.state.movies);
      console.log(filtered);
      var sorted = filtered.sort( (a, b) =>{
        if (a.ratings[0] && b.ratings[0]) {
          if (a.ratings[0].Value > b.ratings[0].Value) {
            return -1;
          } else if ( a.ratings[0].Value < b.ratings[0].Value) {
            return 1;
          }
          return 0;
        }
      });
      this.setState({
        movies: sorted
      });
    });
  }

  render() {
    return (
      <div className='gridRoot container'>
        <div className='row'>
          <div className='col-md-6'>
            <Search searchToServer={this.searchToServer}/>
          </div>
          <div className='col-md-6'>
            <Filtering sortByRating={this.sortByRating} rating={this.state.minRating}/>
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
