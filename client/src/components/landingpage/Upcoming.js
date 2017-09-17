import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import Filtering from './Filtering';
import ResultsListItem from './ResultItem';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

class Upcoming extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      disableYearSelection: false,
      minRating: 0,
      favoriteId: this.props.favoriteId,
      favorites: this.props.favorites,
      movies: this.props.results,
      minRating: 0,
      display: this.props.results,
      radius: 0,
      dateRange: null
    };

    this.sortByRating = this.sortByRating.bind(this);
    this.searchToServer = this.searchToServer.bind(this);
    this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
    this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);
  }

  handleChangeMinDate(event, date) {
    this.setState({
      minDate: date,
    });
    console.log('the new start date is ', this.state.minDate);
  };

  handleChangeMaxDate(event, date) {
    this.setState({
      maxDate: date,
    });
    console.log('the new end date is ', this.state.maxDate);
  };

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  searchToServer(cb) {
    var searchInput = document.getElementById('text-field').value;
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
          movies: container,
          display: container
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

  filterByRating(array) {
    var output = [];
    var end = [];
    array.map( value => {
      if (value.ratings[0]) {
        var score = value.ratings[0].Value.split('/')[0];
        var num = parseFloat(score);
        if (num >= this.state.minRating) {
          output.push(value);
        }
      }
    });
    return output;
  }

  sortByRating(rating) {
    this.setState({
      minRating: rating
    }, () => {
      var filtered = this.filterByRating(this.state.movies);
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
      });
    });
  }

  getMovieData(minDate, maxDate) {
    $.ajax({
      url: 'search/newmovies',
      method: 'GET',
      data: {minDate: minDate, maxDate: maxDate},
      dataType: 'json',
      contentType: 'text/plain',
      success: (results) => {
        console.log(results);
        // var container = [];
        // for (var i = 0; i < results.length; i++) {
        //   container.push(results[i]);
      },
        // this.setState({movies: this.state.movies.concat(results)});
        // this.setState({
        //   movies: container,
        //   display: container
        // });

        // console.log(this.state.movies, '@#$#@$#@');
        // this.render();
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  getTheaterData(playingDate) {
    var radius = document.getElementById('radius').value;
    var dateRange = document.getElementById('dateRange').value;
    $.ajax({
      url: 'search/gettheaters',
      method: 'GET',
      data: {
        playingDate: playingDate,
        radius: radius,
        dateRange: dateRange
      },
      dataType: 'json',
      contentType: 'text/plain',
      success: (results) => {
        console.log(results);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div className='gridRoot container'>
        <div className='row'>
          <div className='col-md-6'>
          <div>
        <div style={optionsStyle}>
          <DatePicker
            onChange={this.handleChangeMinDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Min Date"
            defaultDate={this.state.minDate}
            disableYearSelection={this.state.disableYearSelection}
          />
          <DatePicker
            onChange={this.handleChangeMaxDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Max Date"
            defaultDate={this.state.maxDate}
            disableYearSelection={this.state.disableYearSelection}
          />
          </div>
        </div>
          </div>
          <div className='col-md-6'>
            <Filtering sortByRating={this.sortByRating} rating={this.state.minRating}/>
          </div>
        </div>
        <br/>
        <button type="button" onClick = {() => this.getMovieData(this.state.minDate, this.state.maxDate)}>Click to Get Upcoming Movies!</button>
        <br/> <br/>
        <button type="button" onClick = {() => this.getTheaterData(this.state.minDate)}>Click to See Theaters for Upcoming Movies!</button>
        <br/>
        <br/>
        <select id = "radius">
        <option value="25">25 miles</option>
        <option value="50">50 miles</option>
        <option value="100">100 miles</option>
        </select>

        <select id = "dateRange">
        <option value="30">30 Days</option>
        <option value="60">60 Days</option>
        <option value="90">90 Days</option>
        </select>

        <GridList
          cellHeight='auto'
          cols={5}
          className='gridList'>
          <Subheader>Popular Movies</Subheader>
          {(this.state.display).map( (movie, i) => (
            <ResultsListItem
              key={i}
              movieP={movie}
              favoriteId = {this.state.favoriteId}
              favorites = {this.state.favorites}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

export default Upcoming;
