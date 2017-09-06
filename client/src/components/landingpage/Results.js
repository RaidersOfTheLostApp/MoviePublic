import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
        <GridList cellHeight={200} cols={5} className='gridList'>
          <Subheader>Popular Movies</Subheader>
          {this.props.results.map((movie, i) => (
            <GridTile 
            key={i} 
            subtitle={<span>by <b>{movie.Director}</b></span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            title={movie.Title}
            actionIcon = {this.getFavoriteIcon(movie)}
            >
            <a href = {movie.Website} target = "_blank">
            <img src = {movie.Poster}/>
            </a>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Results;









