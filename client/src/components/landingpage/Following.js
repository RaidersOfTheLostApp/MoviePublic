import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SelectField from 'material-ui/SelectField';
import Search from './Search';
import Filtering from './Filtering';
import Results from './Results';
import MenuItem from 'material-ui/MenuItem';
import ResultsListItem from './ResultItem';

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select_value: 0,
      loading: false,
      genreFollowMongoIds: props.genreFollow || [],
      actorFollowMongoIds: props.actorFollow || [],
      directorFollowMongoIds: props.directorFollow || [],
      modalIsOpen: false,
      // favoriteId: [],
      // followMovies: []
      genreList: props.genreList,
      actorList: props.actorList,
      directorList: props.directorList
    };

  }

  // componentWillMount() {
  //   this.setState({loading: true});
  //
  //   // this.getFollow('movies')
  //   //   .then(movieArr => {
  //   //     this.setState({movieFollowMongoIds: movieArr, loading: false});
  //   //   });
  //   this.getFollow('genres', (err, movieArr) => {
  //     if (err) { console.log('********** error on getFollow ', err); }
  //     var genreArr = movieArr.splice(0, 15);
  //     var actorArr = movieArr.splice(0, 15);
  //     var directorArr = movieArr.splice(0, 15);
  //     this.setState({
  //       genreFollowMongoIds: genreArr,
  //       actorFollowMongoIds: actorArr,
  //       directorFollowMongoIds: directorArr,
  //       loading: false
  //     }, () => {
  //       console.log(this.state.actorFollowMongoIds);
  //       this.getMoviesWithIds(this.state.actorFollowMongoIds);
  //       //TODO: for director movies too
  //     });
  //   });
  //   // this.getFollow('actors', movieArr => {
  //   //   console.log('************* movieArr actors results ', movieArr);
  //   //   this.setState({actorFollowMongoIds: movieArr});
  //   // });
  //   // this.getFollow('directors', movieArr => {
  //   //   console.log('************* movieArr directors results ', movieArr);
  //   //   this.setState({directorFollowMongoIds: movieArr});
  //   // });
  // }
  //
  // getMoviesWithIds(ids) {
  //   //console.log(ids);
  //   $.ajax({
  //     method: 'GET',
  //     url: '/search/id',
  //     query: ids,
  //     success: (data) => {
  //       console.log(data);
  //       this.setState({
  //         followMovies: data
  //       });
  //     },
  //     error: (err) => {
  //       console.log('error, err', err);
  //     }
  //   });
  // }

  // getFollow(type, callback) {
  //   $.ajax({
  //     method: 'GET',
  //     url: '/api/profiles/follows/' + type,
  //     success: (movieArr) => {
  //       callback(null, movieArr);
  //     },
  //     error: (error) => {
  //       console.log('************* get follow handleNext ERROR:', error);
  //       callback(error);
  //     }
  //   });
  // }

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

  // componentDidMount() {
  //   console.log(this.state.movieFollowMongoIds);
  //
  //   this.getMoviesWithIds(this.state.movieFollowMongoIds);
  // }
  // componentDidUpdate() {
  //   console.log(this.state.followMovies);
  //   this.render();
  // }

  handleChange(e, i, value) {
    //TODO filter the results on the primaryText value
    this.setState({
      select_value: value
    });
  }
  //TODO - build menuItems to render dynamically with value and text on mapped props
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
              <SelectField value={this.state.select_value} onChange={this.handleChange.bind(this)} autoWidth={true}>
                <MenuItem value={0} primaryText='Select a Genre to Filter' />
                <MenuItem value={1} primaryText='Genre 1' />
                <MenuItem value={2} primaryText='Genre 2' />
                <MenuItem value={3} primaryText='Genre 3' />
                <MenuItem value={4} primaryText='Genre 4' />
              </SelectField>
            </div>
          </div>
          <GridList key={1} cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.genreFollowMongoIds.map((genre, i) => (
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
              <SelectField value={this.state.select_value} onChange={this.handleChange.bind(this)} autoWidth={true}>
                <MenuItem value={0} primaryText='Select an Actor/Actress to Filter' />
                <MenuItem value={1} primaryText='Actor 1' />
                <MenuItem value={2} primaryText='Actor 2' />
                <MenuItem value={3} primaryText='Actor 3' />
                <MenuItem value={4} primaryText='Actor 4' />
              </SelectField>
            </div>
          </div>
          <GridList key={2} cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.actorFollowMongoIds.map((actor, i) => (
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
              <SelectField value={this.state.select_value} onChange={this.handleChange.bind(this)} autoWidth={true}>
                <MenuItem value={0} primaryText='Select a Director to Filter' />
                <MenuItem value={1} primaryText='Director 1' />
                <MenuItem value={2} primaryText='Director 2' />
                <MenuItem value={3} primaryText='Director 3' />
                <MenuItem value={4} primaryText='Director 4' />
              </SelectField>
            </div>
          </div>
          <GridList key={3} cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.directorFollowMongoIds.map((director, i) => (
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
