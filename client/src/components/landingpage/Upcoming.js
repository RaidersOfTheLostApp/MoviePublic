import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Filtering from './Filtering';
import ResultsListItem from './ResultItem';
import Toggle from 'material-ui/Toggle';
import movieData from './movieTheaterData';

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

class Upcoming extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      autoOk: false,
      disableYearSelection: false,
      minRating: 0,
      favoriteId: this.props.favoriteId,
      favorites: this.props.favorites,
      movies: this.props.results
    };
  }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  };
  
  // componentDidUpdate() {
  //   this.render();
  // }

  // filterByRating(array) {
  //   var output = [];
  //   var end = [];
  //   array.map( value => {
  //     if (value.ratings[0]) {
  //       var score = value.ratings[0].Value.split('/')[0];
  //       var num = parseFloat(score);
  //       if (num >= this.state.minRating) {
  //         output.push(value);
  //       }
  //     }
  //   });
  //   return output;
  // }

  // sortByRating(rating) {
  //   this.setState({
  //     minRating: rating
  //   }, () => {
  //     var filtered = this.filterByRating(this.state.movies);
  //     var sorted = filtered.sort( (a, b) =>{
  //       if (a.ratings[0] && b.ratings[0]) {
  //         if (a.ratings[0].Value > b.ratings[0].Value) {
  //           return -1;
  //         } else if ( a.ratings[0].Value < b.ratings[0].Value) {
  //           return 1;
  //         }
  //         return 0;
  //       }
  //     });
  //     this.setState({
  //       display: sorted,
  //     });
  //   });
  // }

  // getMovieData(minDate, maxDate) {
  //   var directorArray;
  //   var actorArray;
  //   var genreArray;
  //   $.ajax({
  //     url: 'search/newmovies',
  //     method: 'GET',
  //     data: {minDate: minDate, maxDate: maxDate},
  //     dataType: 'json',
  //     contentType: 'text/plain',
  //     success: (results) => {
  //     var newArray = [];
  //     for (var i = 0; i < results.length; i++) {
  //       var releaseDate = results[i].release_date; 
  //       releaseDate = this.dateConvert(releaseDate);

  //       if (this.dateInRange(releaseDate, minDate, maxDate)) {
  //         newArray.push(results[i]);
  //       }
  //      }

  //      this.setState({
  //       upcomingMovies: newArray
  //      });

  //     console.log('the upcoming movies are', this.state.upcomingMovies);

  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   })
  // }

  // getTheaterData(playingDate) {
  //   var radius = document.getElementById('radius').value;
  //   var dateRange = document.getElementById('dateRange').value;
  //   var zipCode = document.getElementById('zipcode').value;
  //   $.ajax({
  //     url: 'search/gettheaters',
  //     method: 'GET',
  //     data: {
  //       startDate: playingDate,
  //       radius: radius,
  //       numDays: dateRange,
  //       zip: zipCode
  //     },
  //     dataType: 'json',
  //     contentType: 'text/plain',
  //     success: (results) => {
  //       var newArray = [];
  //       for (var i = 0; i < results.length; i++) {
  //         if (results[i].releaseYear === 2017) {
  //           newArray.push(results[i]);
  //         }
  //       }

  //       this.setState({
  //         theaterMovies: newArray
  //       });

  //       console.log('the theater movie length is', this.state.theaterMovies.length);
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  //This function is used to see which of the movies currently in theaters are also on the users "upcoming movies" favorites
  // compareMovies(callback) {
  //   var newArrayOne = [];
  //   var arrayOne = this.state.upcomingMovies;
  //   var arrayTwo = this.state.theaterMovies;
  //   var matchedArray = [];

  //   for (var i = 0; i < arrayOne.length; i++) {
  //     newArrayOne.push(arrayOne[i].title);
  //   }

  //   for (var i = 0; i < arrayTwo.length; i++) {
  //     if (newArrayOne.includes(arrayTwo[i].title)) {
  //       matchedArray.push(arrayTwo[i]);
  //     }
  //   }
  //   callback(matchedArray);
  // }

  //This function takes the result of the "compareMovies" function and puts the data in the proper format for Twilio
 //  dataFormatter(array) {
 //    console.log('the array is', array);
 //    var x = {};
 //    for (var i = 0; i < array.length; i++) {
 //      var movieTitle = array[i].title;
 //      x[movieTitle] = {};
 //      for (var k = 0; k < array[i].showtimes.length; k++) {
 //        var theater = array[i].showtimes[k].theatre.name;
 //        var timing = this.dateManipulation(array[i].showtimes[k].dateTime);
 //        var timingArray = timing.split(',');
 //        var date = timingArray[0];
 //        var time = timingArray[1];
 //        // var date = timing
 //        if (x[movieTitle].hasOwnProperty(theater) === false) {
 //          x[movieTitle][theater] = {};
 //          x[movieTitle][theater][date] = [time];
 //        }

 //        else {

 //          if (x[movieTitle][theater].hasOwnProperty(date) === false) {
 //            x[movieTitle][theater][date] = [time];
 //          }

 //          else {
 //            var q = x[movieTitle][theater][date];
 //             q.push(time);
 //             x[movieTitle][theater][date] = q;
 //          }
 //        }
 //      }
 //    }
 //    console.log('the value of the movieTimes is the following', x);
 //    return x;
 // }

  render() {  
    return (
      <div className='gridRoot container'>
        <GridList
          cellHeight='auto'
          cols={5}
          className='gridList'>
          <Subheader>Upcoming Movies</Subheader>
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