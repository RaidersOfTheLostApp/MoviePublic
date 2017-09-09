import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Search from './Search';

class Following extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='muiThemeProvider'>
        <div className='gridRoot'>
          <Search />
          <GridList cellHeight={200} cols={5} className='gridList'>
            <Subheader>MOVIES You Are Following</Subheader>
            {this.props.movieFollow.map((movie, i) => (
              <a href = {movie.website} target = "_blank">
                <GridTile
                  key={i}
                  title={movie.title}
                  subtitle={<span>by <b>{movie.director}</b></span>}
                >
                  <img src = {movie.Poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
          <GridList cellHeight={200} cols={5} className='gridList'>
            <Subheader>GENRES You Are Following</Subheader>
            {this.props.genreFollow.map((genre, i) => (
              <a href = {genre.website} target = "_blank">
                <GridTile
                  key={i}
                  title={genre.title}
                  subtitle={<span>by <b>{genre.director}</b></span>}
                >
                  <img src = {genre.Poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
          <GridList cellHeight={200} cols={5} className='gridList'>
            <Subheader>ACTORS / ACTRESSES You Are Following</Subheader>
            {this.props.actorFollow.map((actor, i) => (
              <a href = {actor.website} target = "_blank">
                <GridTile
                  key={i}
                  title={actor.title}
                  subtitle={<span>by <b>{actor.director}</b></span>}
                >
                  <img src = {actor.Poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
          <GridList cellHeight={200} cols={5} className='gridList'>
            <Subheader>DIRECTORS You Are Following</Subheader>
            {this.props.directorFollow.map((director, i) => (
              <a href = {director.website} target = "_blank">
                <GridTile
                  key={i}
                  title={director.title}
                  subtitle={<span>by <b>{director.director}</b></span>}
                >
                  <img src = {director.Poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
          <GridList cellHeight={200} cols={5} className='gridList'>
            <Subheader>SCREENWRITERS You Are Following</Subheader>
            {this.props.writerFollow.map((writer, i) => (
              <a href = {writer.website} target = "_blank">
                <GridTile
                  key={i}
                  title={writer.title}
                  subtitle={<span>by <b>{writer.director}</b></span>}
                >
                  <img src = {writer.Poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Following;
