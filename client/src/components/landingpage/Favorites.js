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
    };
    this.getFavorites = this.getFavorites.bind(this);
  }

  getFavorites() {
    $.ajax({
      url: '/api/profiles/getfavorites',
      method: 'GET',
      dataType: 'json',
      success: (results) => {
        console.log('************* results ', results.favorites);
        this.setState({
          favorites: results.favorites
        });

        this.render();
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  // clearFavorites() {
  //   console.log('clear favorites on client side')
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/profiles/clearfavorites',
  //     data: [],
  //     success: (results) => {
  //       console.log(results);
  //       this.setState({
  //         favorites: []
  //       });

  //       // this.render();
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  // addFavorites(movie) {
  //     $.ajax({
  //       method: 'POST',
  //       url: '/api/profiles/addfavorites',
  //       data: movie,
  //       success: (user) => {
  //         // user = JSON.parse(user);
  //         console.log('********* success favorites updated for user ' + user);
  //       },
  //       error: (error) => {
  //         console.log('************* error updating favorites for user', error);
  //       }
  //     });
  // }

  // <button type="button" onClick = {this.clearFavorites.bind(this)} > Clear Favorites! </button>

  componentDidMount() {
    this.getFavorites((results) => {
      this.setState({ favorites: results.favorites });
    });
  }

  render() {
    return (
      <div className='muiThemeProvider'>
        <div className='gridRoot'>
          <Search />
          <GridList cellHeight={200} cols={5} className='gridList'>
            <Subheader>Favorites</Subheader>
            {this.state.favorites.map((favorite, i) => (
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
