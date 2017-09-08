import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import Search from './Search';

class Results extends React.Component {
  constructor(props) {
    super(props);
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
  render() {
    return (
      <div className='gridRoot'>
        <Search />
        <GridList cellHeight={200} cols={5} className='gridList'>
          <Subheader>Popular Movies</Subheader>
          {this.props.results.map((movie, i) => (
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
