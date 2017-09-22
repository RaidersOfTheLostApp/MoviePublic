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
import UpcomingResultsListItem from './UpcomingResultItem';

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
      movies: this.props.results,
      following: [],
      followingId: []
    };
  }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  }

  render() { 
    console.log('the upcoming movies are', this.state.movies); 
    return (
      <div className='gridRoot container'>
        <GridList
          cellHeight='auto'
          cols={5}
          className='gridList'>
          <Subheader>Upcoming Movies</Subheader>
          {(this.state.movies).map( (movie, i) => (
            <UpcomingResultsListItem
              key={i}
              movieP={movie}
              followingId = {this.state.followingId}
              following = {this.state.following}
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