import React from 'react';
import _ from 'lodash';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Search from './Search';
import $ from 'jquery';
import ResultsListItem from './ResultItem';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      modalIsOpen: false,
      favoriteId: [],
      movieP: this.props.movie,
    };

    this.getFavorites = this.getFavorites.bind(this);
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

  getFavorites() {
    $.ajax({
      method: 'GET',
      url: '/api/profiles/getfavorites',
      dataType: 'json',
      success: (results) => {
        console.log('************* results ', results.favorites);
        var output = [];
        for (var i = 0; i < results.favorites.length; i++) {
          var newval = results.favorites[i].item;
          output.push(newval);
        }
        // results.forEach( value => {
        //   var newval = to_json(value)
        //   output.push(newval);
        // })

        this.setState({
          favorites: output
        });
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
    this.getFavorites();
  }

  componentDidUpdate() {
    this.render();
  }

  render() {
    console.log(this.state);
    return (
      <div className='muiThemeProvider'>
        <div className='gridRoot container'>
          <div className='row'>
            <div className='col-6'>
              <Search />
            </div>
          </div>
          <GridList cellHeight={200} cols={5} className='gridList'>
            <Subheader>Favorites</Subheader>
            {(this.state.favorites).map((favorite, i) => (
              <ResultsListItem
                movieP={favorite}
                k={i}
              />
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Favorites;
