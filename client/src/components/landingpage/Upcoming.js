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
import movieData from './movieTheaterData';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

class Upcoming extends React.Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
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
      dateRange: null,
      upcomingMovies: [],
      theaterMovies: movieData
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
  };

  handleChangeMaxDate(event, date) {
    this.setState({
      maxDate: date,
    });
  };

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  dateConvert(d) { 
    return (
        d.constructor === Date ? d :
        d.constructor === Array ? new Date(d[0],d[1],d[2]) :
        d.constructor === Number ? new Date(d) :
        d.constructor === String ? new Date(d) :
        typeof d === "object" ? new Date(d.year,d.month,d.date) :
        NaN
    );
  }
  
  dateCompare(a,b) {      
    return (
        isFinite(a=this.dateConvert(a).valueOf()) &&
        isFinite(b=this.dateConvert(b).valueOf()) ?
        (a>b)-(a<b) :
        NaN
    );
  }
  
  dateInRange(d,start,end) {
   return (
        isFinite(d=this.dateConvert(d).valueOf()) &&
        isFinite(start=this.dateConvert(start).valueOf()) &&
        isFinite(end=this.dateConvert(end).valueOf()) ?
        start <= d && d <= end :
        NaN
    );
  }

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
      var newArray = [];
      for (var i = 0; i < results.length; i++) {
        var releaseDate = results[i].release_date; 
        releaseDate = this.dateConvert(releaseDate);

        if (this.dateInRange(releaseDate, minDate, maxDate)) {
          newArray.push(results[i]);
          console.log(results[i].title);
        }
       }

       this.setState({
        upcomingMovies: newArray
       });

      console.log('the upcoming movies are', this.state.upcomingMovies);

      },
      error: (err) => {
        console.log('err', err);
      }
    })
  }

  getTheaterData(playingDate) {
    var radius = document.getElementById('radius').value;
    var dateRange = document.getElementById('dateRange').value;
    var zipCode = document.getElementById('zipcode').value;
    $.ajax({
      url: 'search/gettheaters',
      method: 'GET',
      data: {
        startDate: playingDate,
        radius: radius,
        numDays: dateRange,
        zip: zipCode
      },
      dataType: 'json',
      contentType: 'text/plain',
      success: (results) => {
        // console.log(results);
        for (var i = 0; i < results.length; i++) {
          // console.log(results[i].title);
        }

        this.setState({
          theaterMovies: results
        });

        console.log(results);
        // console.log('the movies in theaters are ', this.state.theaterMovies);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  compareMovies() {
    // var arrayOne = this.state.upcomingMovies;
    var newArray = [];
    var arrayTwo = this.state.theaterMovies;
    // var matchedArray = [];
    // var newArrayTwo = [];
    for (var i = 0; i < arrayTwo.length; i++) {
      if (arrayTwo[i].releaseYear === 2017) {
        newArray.push(arrayTwo[i]);
        console.log(arrayTwo[i].title);
      }
    }
    console.log(newArray);
    return newArray;

    // for (var i = 0; i < arrayTwo.length; i++) {
    //   newArrayTwo.push(arrayTwo[i].title);
    // }

    // for (var i = 0; i < arrayOne.length; i++) {
    //   if (newArrayTwo.includes(arrayOne[i].title)) {
    //     matchedArray.push(arrayOne[i]);
    //   }
    // }
    // console.log(matchedArray);
    // return matchedArray
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
        <br/> <br/>
        <button type="button" onClick = {() => this.compareMovies()}>Click to see which of your favorite movies are now in theaters!</button>
        <br/> <br/>
        <select id = "radius">
        <option value="5">5 miles</option>
        <option value="10">10 miles</option>
        <option value="25">25 miles</option>
        </select>

        <select id = "dateRange">
        <option value="7">7 Days</option>
        <option value="14">14 Days</option>
        <option value="30">30 Days</option>
        </select>

        <br/> <br/>

        <label>Zip Code</label>
        <input 
        name = "zipcode"
        type = "text"
        id = "zipcode"
        />

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

//Sample API Request:
//http://data.tmsapi.com/v1.1/movies/showings?startDate=2016-09-18&numDays=60&zip=94117&radius=10&api_key=kew4j86k7c8ckcuv6q3sbbsk