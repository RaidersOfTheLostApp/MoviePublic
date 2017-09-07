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

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: this.props.results
    }
  }

  getFavoriteIcon(movie) {
    var arr = this.props.favoriteId;
    return (
      <IconButton onClick={()=>{
        if (arr.indexOf(movie.imdbID) === -1) {
          this.props.addFavorites(movie);
        }
      }}>
        {movie.imdbID in this.props.favoriteId ?
          <Favorite color="white" /> :
          <FavoriteBorder color="white" />
        }
      </IconButton>
    );
  }

  searchToServer() {
    var searchInput = document.getElementById('text-field').value;
    console.log(searchInput);
    $.ajax({
      url: '/search',
      method: 'GET',
      data: {value: searchInput},
      dataType: 'json',
      contentType: 'text/plain',
      success: (results) => {
        console.log(this.props, '@@@')
        console.log(results)
        console.log(this.state.movies,'before')

        // this.setState({movies: this.state.movies.concat(results)});
        this.setState({
          movies: results
        });

        console.log(this.state.movies)
        this.render();
      },
      error: (err) => {
        console.log('err', err);
      }
    });

  }

  render() {
    console.log(this.state.movies, '10000')
    return (
      <div className='gridRoot'>
        <Search searchToServer={this.searchToServer.bind(this)}/>
        <Filtering />
        <GridList cellHeight={200} cols={5} className='gridList'>
          <Subheader>Popular Movies</Subheader>
          {(this.state.movies).map((movie, i) => (
            <GridTile
              key={i}
              subtitle={<span>by <b>{movie.directors}</b></span>}
              title={movie.title}
              actionIcon = {this.getFavoriteIcon(movie)}
            >
              <a href = {movie.website} target = "_blank">
                <img src = {movie.poster}/>
              </a>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Results;
