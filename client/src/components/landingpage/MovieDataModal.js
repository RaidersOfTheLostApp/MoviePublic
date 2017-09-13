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
import Search from './Search';
import Filtering from './Filtering';
import Results from './Results';
import ReactPlayer from 'react-player';

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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '100%',
    height: '100%'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class MovieDataModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.props.closeModal}
      />,
      <FlatButton
        label="Buy Tickets"
        primary={true}
      />
    ];

    return (
      <div>
        <Dialog
          title={this.props.movieP.title}
          titleStyle={customTitleStyle}
          modal={true}
          actions={actions}
          open={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
          contentClassName='dialog'
        >

          <div className="col-md-6">
            <p></p>
            <img src={this.props.movieP.poster} class="img-responsive"/>
          </div>

          <div className="col-md-6">
            <form>
              <p></p>
              <p><strong>Description</strong>: {this.props.movieP.description}</p>
              <p><strong>Actors/Actresses</strong>: {this.props.movieP.actors}</p>
              <p><strong>Director/s</strong>: {this.props.movieP.directors}</p>
              <p><strong>Release Date</strong>: {this.props.movieP.release_date}</p>
              <p><strong>Genre/s</strong>: {this.props.movieP.genre}</p>
              <p><strong>Runtime</strong>: {this.props.movieP.runtime}</p>
              <p><strong>Website</strong>: <a href={this.props.movieP.website}>{this.props.movieP.website}</a></p>
              <p><strong>Ratings</strong></p>
              {this.props.movieP.ratings.map( value => {
                return (<p>{value.Source}: {value.Value}</p>);
              })}
              <p><strong>Similar Movies</strong></p>
              <div style={styles.root}>
                <GridList style={styles.gridList} cols={2.2}>
                  <GridTile
                    key= {this.props.i}
                    subtitle= {<span>by <b>{this.props.movieP.directors}</b></span>}
                    title={this.props.movieP.title}
                  >
                    <img src = {this.props.movieP.poster} height="100%" width="100%"/>
                  </GridTile>
                </GridList>
                <ReactPlayer url='https://www.youtube.com/watch?v=ZUG9qYTJMsI' playing />
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default MovieDataModal;
