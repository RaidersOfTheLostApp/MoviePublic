import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import MovieDataModal from './MovieDataModal.js';
import VideoModal from './videoModal.js';

const customContentStyle = {
  backgroundColor: '#1a1aff',
  width: '60%',
  maxWidth: 'none',
  fontFamily: 'Roboto, sans-serif',
};
const customTitleStyle = {
  // backgroundColor:'#50B6C2',
  backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#3D8DB5),to(#5583B5))',
  backgroundImage: '-webkit-linear-gradient(top, #3D8DB5 0%,#5583B5 100%)',
  backgroundImage: '-o-linear-gradient(top, #3D8DB5 0%,#5583B5 100%)',
  backgroundImage: 'linear-gradient(to bottom, #3D8DB5 0%,#5583B5 100%)',
};
const styles = {
  root: {
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    overflowX: 'auto'
    // width: '100%'
    // height: '200'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class ResultScroll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      // favoriteId: this.props.favoriteId,
      // favorites: this.props.favorites,
      videoIsOpen: false
    };

    this.switchToVideoModal = this.switchToVideoModal.bind(this);
    this.switchToDataModal = this.switchToDataModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeVideoModal = this.closeVideoModal.bind(this);
  }

  // getFavoriteIcon(movie) {
  //   var arr = this.state.favoriteId;
  //   return (
  //     <IconButton onClick={()=>{
  //       this.addFavorites(movie);
  //     }}>
  //       {(arr.indexOf(movie._id.toString()) !== -1) ?
  //         <Favorite color="white" /> :
  //         <FavoriteBorder color="white" />
  //       }
  //     </IconButton>
  //   );
  // }
  //
  // addFavorites(movie) {
  //   var movieId = (movie._id);
  //   if (this.state.favoriteId.indexOf(movieId) === -1) {
  //     $.ajax({
  //       method: 'POST',
  //       url: '/api/profiles/addfavorites',
  //       data: movie._id,
  //       success: (user) => {
  //         console.log('********* success favorites updated for user ' + user);
  //         var favId = this.state.favoriteId;
  //         var favorites = this.state.favorites;
  //         favId.push(movieId);
  //         favorites.push(movie);
  //
  //         this.setState({
  //           favorites: favorites,
  //           favoriteId: favId
  //         });
  //       },
  //       error: (error) => {
  //         console.log('************* error updating favorites for user', error);
  //       }
  //     });
  //   } else {
  //     console.log('this favorite is already in the list');
  //
  //     $.ajax({
  //       method: 'POST',
  //       url: '/api/profiles/removefavorites',
  //       data: movie._id,
  //       success: (user) => {
  //         console.log('********* favorite removed for user ' + user);
  //
  //         var favId = this.state.favoriteId;
  //         var favorites = this.state.favorites;
  //         var favIndex = favId.indexOf(movieId);
  //         favId.splice(favIndex, 1);
  //         for (var i = 0; i < favorites.length; i++) {
  //           if (favorites[i]._id === movieId) {
  //             favorites.splice(i, 1);
  //           }
  //         }
  //
  //         this.setState({
  //           favorites: favorites,
  //           favoriteId: favId
  //         });
  //
  //       },
  //       error: (error) => {
  //         console.log('************* error removing favorite for user ', error);
  //       }
  //     });
  //   }
  // }

  openModal() {
    if (this.state.videoIsOpen) {
      this.setState({
        modalIsOpen: true,
        videoIsOpen: false
      });
    } else {
      this.setState({
        modalIsOpen: true
      });
    }
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal(cb) {
    this.setState({
      modalIsOpen: false,
    });
    if (cb) { cb(); }
  }

  closeVideoModal(cb) {
    this.setState({
      videoIsOpen: false,
    });
    if (cb) {
      cb();
    }
  }

  switchToVideoModal() {
    this.closeModal( () => {
      this.setState({
        videoIsOpen: true
      });
    });
  }

  switchToDataModal() {
    this.closeVideoModal( () => {
      this.setState({
        modalIsOpen: true,
      });
    });
  }

  componentDidUpdate() {
    this.render();
  }

  render() {
    return (
      <div>
        <GridTile
            key={this.props.k}
            title={this.props.title}
            subtitle={this.props.subtitle}
            titlePosition={'bottom'}
            style={{height:'200px'}}
          >
          <img src = {this.props.movieP.poster}  onClick={this.openModal}/>
        </GridTile>
        <MovieDataModal
          closeModal={this.closeModal}
          openModal={this.openModal}
          movieP={this.props.movieP}
          modalIsOpen={this.state.modalIsOpen}
          switchToVideoModal={this.switchToVideoModal}
        />
        <VideoModal
          closeModal={this.closeVideoModal}
          openModal={this.switchToVideoModal}
          movieP={this.props.movieP}
          modalIsOpen={this.state.videoIsOpen}
          switchToDataModal={this.switchToDataModal}
        />
      </div>
    );
  }
}

export default ResultScroll;
