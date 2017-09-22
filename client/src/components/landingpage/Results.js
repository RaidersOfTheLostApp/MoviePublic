import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Search from './Search';
import Filtering from './Filtering';
import ResultsListItem from './ResultItem';
import ResultScroll from './ResultScroll';
import Divider from 'material-ui/Divider';

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favoriteId: this.props.favoriteId,
      favorites: this.props.favorites,
      movies: this.props.results,
      minRating: 0,
      display: this.props.results
    };
    this.sortByRating = this.sortByRating.bind(this);
    this.searchToServer = this.searchToServer.bind(this);
    // this.styleGridList = {
    //   width: '100%',
    //   height: '100%',
    //   // cellHeight: '260px',
    //   overflowY: 'auto'
    // };
  }

  searchToServer(cb) {
    var searchInput = document.getElementById('text-field').value;
    $.ajax({
      url: '/search',
      method: 'GET',
      data: {value: searchInput},
      dataType: 'json',
      contentType: 'application/json',
      success: (results) => {
        console.log(results, '^^^^');
        var container = [];
        for (var i = 0; i < results.length; i++) {
          console.log(results, '!!');
          container.push(results[i].item);
          if (container.length === results.length) {
            this.setState({
              movies: container,
              display: container
            });
          }
        }
        // this.setState({movies: this.state.movies.concat(results)});


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

  filterByRating(array) {
    var output = [];
    var end = [];
    array.map( value => {
      if (value.ratings[0]) {
        var score = value.ratings[0].Value.split('/')[0];
        var num = parseFloat(score);
        console.log(this.state.minRating, num, 'rating');
        if (num >= this.state.minRating) {
          output.push(value);
        }
      }
    });
    return output;
  }
  sortByActor(actor) {

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
        display: sorted,
        minRating: rating
      });
    });
  }

  render() {
    return (
      <div className='gridRoot container'>
        <div className='top row'>
          <div className='col-md-6'>
            <Search searchToServer={this.searchToServer}/>
          </div>
          <div className='col-md-6'>
            <Filtering sortByRating={this.sortByRating} rating={this.state.minRating}/>
          </div>
        </div>
        <Subheader>Top 10 Recommended Movies For You</Subheader>
        <Divider />
        <br />
        <GridList key={1} cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', border: 'solid'}}>
          {this.props.recs.map((movie, i) => (
            <ResultScroll
              k={i}
              movieP={movie}
              title={' '}
              subtitle={movie.title || null}
            />
          ))}
        </GridList>
        <Subheader>Popular Movies</Subheader>
        <Divider />
        <br />
        <GridList
          cellHeight={260}
          cols={5}
        >
          {(this.state.display).map( (movie, i) => (
            <ResultsListItem
              k={i}
              movieP={movie}
              favoriteId = {this.state.favoriteId}
              favorites = {this.state.favorites}
              style={{height: '260px'}}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

export default Results;

// cellHeight='350'
