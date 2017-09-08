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
import ResultsListItem from './ResultItem.js';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteId: [],
      favorites: [],
      movies: this.props.results,
    };
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
        console.log(this.props, '@@@');
        console.log(results);
        console.log(this.state.movies, 'before');
        var container = [];
        for (var i = 0; i < results.length; i++) {
          container.push(results[i].item);
        }
        // this.setState({movies: this.state.movies.concat(results)});
        this.setState({
          movies: container
        });

        console.log(this.state.movies);
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  addFavorites(result) {
    if (this.state.favoriteId.indexOf(result.id) === -1) {
      this.state.favoriteId.push(result.id);
      this.state.favorites.push(result);
      $.ajax({
        method: 'POST',
        url: '/api/favorite/savefavorites',
        data: {
          favorites: this.state.favorites
        },
        success: (user) => {
          user = JSON.parse(user);
          console.log('********* success favorites updated for user ', user);
        },
        error: (error) => {
          console.log('************* error updating favorites for user', error);
        }
      });
    }
  }
  
  handleSearch() {
    this.searchToServer( () => {
      this.render();
    });
  }
  // dbSearch(query, callback){
  //   $.ajax({
  //     url: '/search',
  //     method: 'GET',
  //     data: {value: query},
  //     dataType: 'json',
  //     contentType: 'text/plain',
  //     success: (results) => {
  //       console.log(results, '@@#$$')
  //       callback(results)
  //       this.state.rerender = !this.state.rerender;
  //       // this.setState({movies: this.state.movies.concat(results)});
  //       // console.log(this.state.movies, '@#$#@$#@')
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }
  //
  // searchToServer() {
  //   var searchInput = document.getElementById('text-field').value;
  //   console.log(searchInput);
  //   var searchMongo = (data) => {
  //     console.log(data, '@#$@##$#@')
  // this.setState({
  //   movies: data
  // })
  //   }
  //   this.dbSearch(searchInput, searchMongo)
  //   this.forceUpdate();
  // }

  // addFavorites(result) {
  //   if (this.state.favoriteId.indexOf(result.id) === -1) {
  //     this.state.favoriteId.push(result.id);
  //     this.state.favorites.push(result);
  //     $.ajax({
  //       method: 'POST',
  //       url: '/api/favorite/savefavorites',
  //       data: {
  //         favorites: this.state.favorites,
  //       },
  //       success: (user) => {
  //         user = JSON.parse(user);
  //         console.log('********* success favorites updated for user ', user);
  //       },
  //       error: (error) => {
  //         console.log('************* error updating favorites for user', error);
  //       }
  //     });
  //   }
  // }

  render() {
    console.log(this.state.movies, '10000');
    return (
      <div className='gridRoot container'>
        <div className='row'>
          <div className='col-6'>
            <Search searchToServer={this.searchToServer.bind(this)}/>
          </div>
          <div className='col-6'>
            <Filtering />
          </div>
        </div>
        <GridList cellHeight={200} cols={5} className='gridList'>
          <Subheader>Popular Movies</Subheader>
          {(this.state.movies).map((movieA, i) => (
            <ResultsListItem movieP={movieA} i={i} getFavoriteIcon={this.getFavoriteIcon.bind(this)} />
          ))}
        </GridList>
      </div>
    );
  }
}

export default Results;
