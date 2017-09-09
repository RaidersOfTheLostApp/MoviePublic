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
import Results from './Results';

class ResultsListItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.i, 'CONSOLELOG');
    this.state = {
      movieI: this.props.movieP
    };
    console.log(this.state.movieI);
  }


  render() {
    console.log(this.state, '10000');
    return (
      <GridTile
        key= {this.props.i}
        subtitle= {<span>by <b>{this.props.movieP.directors}</b></span>}
        title={this.props.movieP.title}
        actionIcon = {this.props.getFavoriteIcon(this.props.movieP)}
      >
        <a href = {this.props.movieP.website} target = "_blank">
          <img src = {this.props.movieP.poster}/>
        </a>
      </GridTile>
    );
  }
}

export default ResultsListItem;
