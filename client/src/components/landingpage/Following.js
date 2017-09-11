import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select_value: 0,
      loading: false,
      movieFollowMongoIds: [],
      genreFollowMongoIds: [],
      actorFollowMongoIds: [],
      directorFollowMongoIds: [],
      writerFollowMongoIds: []
    };
  }

  componentWillMount() {
    this.setState({loading: true});

    // this.getFollow('movies')
    //   .then(movieArr => {
    //     this.setState({movieFollowMongoIds: movieArr, loading: false});
    //   });
    this.getFollow('genres', (err, movieArr) => {
      if (err) { console.log('********** error on getFollow ', err); }
      var genreArr = movieArr.splice(0, 15);
      var movieArrNew = movieArr.splice(0, 15);
      var actorArr = movieArr.splice(0, 15);
      var directorArr = movieArr.splice(0, 15);
      var writerArr = movieArr.splice(0);
      this.setState({
        genreFollowMongoIds: genreArr,
        movieFollowMongoIds: movieArrNew,
        actorFollowMongoIds: actorArr,
        directorFollowMongoIds: directorArr,
        writerFollowMongoIds: writerArr,
        loading: false
      });
    });
    // this.getFollow('actors', movieArr => {
    //   console.log('************* movieArr actors results ', movieArr);
    //   this.setState({actorFollowMongoIds: movieArr});
    // });
    // this.getFollow('directors', movieArr => {
    //   console.log('************* movieArr directors results ', movieArr);
    //   this.setState({directorFollowMongoIds: movieArr});
    // });
    // this.getFollow('writers', movieArr => {
    //   console.log('************* movieArr wrtiers results ', movieArr);
    //   this.setState({writerFollowMongoIds: movieArr});
    // });
  }

  getFollow(type, callback) {
    $.ajax({
      method: 'GET',
      url: '/api/profiles/follows/' + type,
      success: (movieArr) => {
        callback(null, movieArr);
      },
      error: (error) => {
        console.log('************* get follow handleNext ERROR:', error);
        callback(error);
      }
    });
  }

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
              <Subheader>MOVIES You Are Following</Subheader>
            </div>
          </div>
          <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.movieFollowMongoIds.map((movie, i) => (
              <a href = {movie.website} target = "_blank">
                <GridTile
                  key={i}
                  title={movie.title}
                  subtitle={<span>by <b>{movie.directors[0]}</b></span>}
                >
                  <img src={movie.poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
        </div>
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
          <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.genreFollowMongoIds.map((genre, i) => (
              <a href = {genre.website} target = "_blank">
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
          <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.actorFollowMongoIds.map((actor, i) => (
              <a href = {actor.website} target = "_blank">
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
          <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.directorFollowMongoIds.map((director, i) => (
              <a href = {director.website} target = "_blank">
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
        <div className='followRoot container'>
          <div className='row'>
            <div className='col-4'>
              <Subheader>SCREENWRITERS You Are Following</Subheader>
            </div>
            <div className='col-4'>
              <SelectField value={this.state.select_value} onChange={this.handleChange.bind(this)} autoWidth={true}>
                <MenuItem value={0} primaryText='Select a Writer to Filter' />
                <MenuItem value={1} primaryText='Writer 1' />
                <MenuItem value={2} primaryText='Writer 2' />
                <MenuItem value={3} primaryText='Writer 3' />
                <MenuItem value={4} primaryText='Writer 4' />
              </SelectField>
            </div>
          </div>
          <GridList cellHeight={200} cols={3} className='followingList' style={{display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {this.state.writerFollowMongoIds.map((writer, i) => (
              <a href = {writer.website} target = "_blank">
                <GridTile
                  key={i}
                  title={writer.title}
                  subtitle={<span>by <b>{writer.directors[0]}</b></span>}
                >
                  <img src = {writer.poster}/>
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
