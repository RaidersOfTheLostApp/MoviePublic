import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Search from './Search';
import $ from 'jquery';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    }
  }

  getFavorites(callback) {
    $.ajax({
      url: '/api/profiles/getfavorites',
      method: 'GET',
      dataType: 'json',
      success: (results) => {
        callback(results.favorites);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  componentDidMount() {
    this.getFavorites((results) => {
      console.log(results);
      this.setState({ favorites: results });
    });
  }

  render() {
    console.log('the state for this is the following: ' + this.state.favorites);
    return (
      <div className='muiThemeProvider'>
        <div className='gridRoot'>
          <Search />
          <button onClick={this.getFavorites} type="button" id = "favorites">Get Favorites!</button>
          <GridList cellHeight={200} cols={5} className='gridList'>
            <Subheader>Favorites</Subheader>
            {this.props.favorites.map((favorite, i) => (
              <a href = {favorite.website} target = "_blank">
                <GridTile 
                  key={i} 
                  title={favorite.title}
                  subtitle={<span>by <b>{favorite.director}</b></span>}
                >
                  <img src = {favorite.poster}/>
                </GridTile>
              </a>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Favorites;





