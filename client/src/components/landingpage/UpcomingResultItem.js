import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Search from './Search';
import Filtering from './Filtering';
import Results from './Results';
import UpcomingMovieDataModal from './UpcomingMovieDataModal.js';
import UpcomingVideoModal from './UpcomingVideoModal.js';

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
    overflowX: 'auto',
    width: '100%',
    height: '100%'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class UpcomingResultsListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      followingId: this.props.followingId,
      following: this.props.following,
      videoIsOpen: false
    };

    this.switchToVideoModal = this.switchToVideoModal.bind(this);
    this.switchToDataModal = this.switchToDataModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeVideoModal = this.closeVideoModal.bind(this);
  }

  getFollowingIcon(movie) {
    // console.log('********** getFollowingIcon movie ', movie);
    var arr = this.state.followingId;
    return (
      <IconButton onClick={()=>{
        this.addFollowingMovie(movie);
      }}>
        {(arr.indexOf(movie.imdbID.toString()) !== -1) ?
          <Star color="white" /> :
          <StarBorder color="white" />
        }
      </IconButton>
    );
  }

  addFollowingMovie(movie) {
    var movieId = (movie.imdbID);
    // console.log('********** movie in addFollowingMovie ', movie);
    if (this.state.followingId.indexOf(movieId) === -1) {
      $.ajax({
        method: 'POST',
        url: '/api/profiles/addIMDbFollow',
        data: movie,
        success: (movie) => {
          console.log('********* success following updated for movie ' + movie);
          var followingId = this.state.followingId;
          followingId.push(movieId);
          var following = this.state.following;
          following.push(movie);

          this.setState({
            following: following,
            followingId: followingId
          });
        },
        error: (error) => {
          console.log('************* error updating following for user', error);
        }
      });
    // } else {
    //   console.log('this following is already in the list');

    //   $.ajax({
    //     method: 'POST',
    //     url: '/api/profiles/removefollowing',
    //     data: movie.id,
    //     success: (user) => {
    //       console.log('********* following removed for user ' + user);

    //       var followingId = this.state.followingId;
    //       var following = this.state.following;
    //       var followingIndex = followingId.indexOf(movieId);
    //       followingId.splice(followingIndex, 1);
    //       for (var i = 0; i < following.length; i++) {
    //         if (following[i].imdbID === movieId) {
    //           following.splice(i, 1);
    //         }
    //       }

    //       this.setState({
    //         following: following,
    //         followingId: followingId
    //       });

    //     },
    //     error: (error) => {
    //       console.log('************* error removing following for user ', error);
    //     }
    //   });
    // }
    }
  }

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
    console.log('*********** upcoming movies ', this.props.movieP);
    return (
      <div>
        <GridTile
          key={this.props.k}
          subtitle={<span>Release Date: <b>{this.props.movieP.release_date.slice(5)}</b></span>}
          title={this.props.movieP.title}
          actionIcon={this.getFollowingIcon(this.props.movieP)}
        >
          <img src={this.props.movieP.poster_path} onClick={this.openModal} height="100%" width="100%"/>
        </GridTile>
        <UpcomingMovieDataModal
          closeModal={this.closeModal}
          openModal={this.openModal}
          movieP={this.props.movieP}
          modalIsOpen={this.state.modalIsOpen}
          switchToVideoModal={this.switchToVideoModal}
        />
        <UpcomingVideoModal
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

export default UpcomingResultsListItem;
