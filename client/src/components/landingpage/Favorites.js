import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Search from './Search';
import ResultsListItem from './ResultItem';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.favorites,
      favoriteId: this.props.favoriteId,
      // modalIsOpen: false,
      movieP: this.props.movie
    };
  }

  // openModal() {
  //   this.setState({modalIsOpen: true});
  // }
  //
  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }
  //
  // closeModal() {
  //   this.setState({modalIsOpen: false});
  // }
  //
  // componentDidUpdate() {
  //   this.render();
  // }

  render() {
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
                favoriteId={this.state.favoriteId}
                favorites={this.state.favorites}
              />
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Favorites;
