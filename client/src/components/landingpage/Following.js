import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ResultScroll from './ResultScroll';
const async = require('async');

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select_value_genre: 0,
      select_value_actor: 0,
      select_value_director: 0,

      loading: false,

      genreFollowMongoIds: props.genreFollow || [],
      actorFollowMongoIds: props.actorFollow || [],
      directorFollowMongoIds: props.directorFollow || [],

      genreMongoIdsFiltered: props.genreFollow || [],
      actorMongoIdsFiltered: props.actorFollow || [],
      directorMongoIdsFiltered: props.directorFollow || [],

      modalIsOpen: false,

      genreList: props.genreList,
      actorList: props.actorList,
      directorList: props.directorList
    };
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  sortMoviesGenre(movies, target, callback1) {
    var sortedArr = [];
    async.each(movies, function(movie, callback2) {
      var genres = movie.genre[0].split(', ');
      for (var i = 0; i < genres.length; i++) {
        if (genres[i] === target) {
          sortedArr.push(movie);
        }
      }
      callback2();
    }, function(err) {
      callback1(sortedArr);
    });
  }

  handleChangeGenre(e, i, value) {
    if (value === 0) {
      this.setState({
        select_value_genre: 0,
        genreMongoIdsFiltered: this.state.genreFollowMongoIds
      });
      return;
    }
    var context = this;
    for (var i = 0; i < this.state.genreList.length; i++) {
      if (this.state.genreList[i].id === value) {
        this.sortMoviesGenre(this.state.genreFollowMongoIds, this.state.genreList[i].text, function(result) {
          context.setState({
            select_value_genre: value,
            genreMongoIdsFiltered: result
          });
        });
        break;
      }
    }
  }

  //TODO: refactor to remove duplicate code for all 3 filter types
  sortMoviesActor(movies, target, callback1) {
    var sortedArr = [];
    async.each(movies, function(movie, callback2) {
      var actors = movie.actors[0].split(', ');
      for (var i = 0; i < actors.length; i++) {
        if (actors[i] === target) {
          sortedArr.push(movie);
        }
      }
      callback2();
    }, function(err) {
      callback1(sortedArr);
    });
  }

  handleChangeActor(e, i, value) {
    if (value === 0) {
      this.setState({
        select_value_actor: 0,
        actorMongoIdsFiltered: this.state.actorFollowMongoIds
      });
      return;
    }
    var context = this;
    for (var i = 0; i < this.state.actorList.length; i++) {
      if (this.state.actorList[i].id === value) {
        this.sortMoviesActor(this.state.actorFollowMongoIds, this.state.actorList[i].text, function(result) {
          context.setState({
            select_value_actor: value,
            actorMongoIdsFiltered: result
          });
        });
        break;
      }
    }
  }

  //TODO: refactor to remove duplicate code for all 3 filter types
  sortMoviesDirector(movies, target, callback1) {
    var sortedArr = [];
    async.each(movies, function(movie, callback2) {
      var directors = movie.directors[0].split(', ');
      for (var i = 0; i < directors.length; i++) {
        if (directors[i] === target) {
          sortedArr.push(movie);
        }
      }
      callback2();
    }, function(err) {
      callback1(sortedArr);
    });
  }

  handleChangeDirector(e, i, value) {
    if (value === 0) {
      this.setState({
        select_value_director: 0,
        directorMongoIdsFiltered: this.state.directorFollowMongoIds
      });
      return;
    }
    var context = this;
    for (var i = 0; i < this.state.directorList.length; i++) {
      if (this.state.directorList[i].id === value) {
        this.sortMoviesDirector(this.state.directorFollowMongoIds, this.state.directorList[i].text, function(result) {
          context.setState({
            select_value_director: value,
            directorMongoIdsFiltered: result
          });
        });
        break;
      }
    }
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <div className='muiThemeProvider'>
        <div className='followRoot container'>
          <div className='row'>
            <div className='col-4'>
              <Subheader>GENRES You Are Following</Subheader>
            </div>
            <div className='col-4'>
              <SelectField value={this.state.select_value_genre} onChange={this.handleChangeGenre.bind(this)} autoWidth={true}>
                <MenuItem key={0} value={0} primaryText='Select a Genre to Filter' />
                {this.state.genreList.map(genre => (
                  <MenuItem key={genre.id} value={genre.id} primaryText={genre.text} />
                ))}
              </SelectField>
            </div>
          </div>
          <GridList key={1} cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.genreMongoIdsFiltered.map((genre, i) => (
              <a href = {genre.website === 'N/A' ? '#' : genre.website} target = "_blank">
                <GridTile
                  key={i}
                  title={genre.title}
                  subtitle={<span>by <b>{genre.directors[0]}</b></span>}
                >
                  <img src = {genre.poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
        </div>
        <div className='followRoot container'>
          <div className='row'>
            <div className='col-4'>
              <Subheader>ACTORS / ACRESSES You Are Following</Subheader>
            </div>
            <div className='col-4'>
              <SelectField value={this.state.select_value_actor} onChange={this.handleChangeActor.bind(this)} autoWidth={true}>
                <MenuItem key={0} value={0} primaryText='Select an Actor/Actress to Filter' />
                  {this.state.actorList.map(actor => (
                    <MenuItem key={actor.id} value={actor.id} primaryText={actor.text} />
                  ))}
              </SelectField>
            </div>
          </div>
          <GridList key={2} cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.actorMongoIdsFiltered.map((actor, i) => (
              <a href = {actor.website === 'N/A' ? '#' : actor.website} target = "_blank">
                <GridTile
                  key={i}
                  title={actor.title}
                  subtitle={<span>by <b>{actor.directors[0]}</b></span>}
                >
                  <img src = {actor.poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
        </div>
        <div className='followRoot container'>
          <div className='row'>
            <div className='col-4'>
              <Subheader>DIRECTORS You Are Following</Subheader>
            </div>
            <div className='col-4'>
              <SelectField value={this.state.select_value_director} onChange={this.handleChangeDirector.bind(this)} autoWidth={true}>
                <MenuItem key={0} value={0} primaryText='Select a Director to Filter' />
                  {this.state.directorList.map(director => (
                    <MenuItem key={director.id} value={director.id} primaryText={director.text} />
                  ))}
              </SelectField>
            </div>
          </div>
          <GridList key={3} cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.directorMongoIdsFiltered.map((director, i) => (
              <a href = {director.website === 'N/A' ? '#' : director.website} target = "_blank">
                <GridTile
                  key={i}
                  title={director.title}
                  subtitle={<span>by <b>{director.directors[0]}</b></span>}
                >
                  <img src = {director.poster}/>
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
