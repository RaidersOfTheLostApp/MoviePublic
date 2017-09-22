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
  width: '50%',
  height: '70%',
  maxWidth: 'none',
  fontFamily: 'Roboto, sans-serif',
};
const customTitleStyle = {
  // backgroundColor:'#50B6C2',
  textAlign: 'center',
  boxShadow: '0px 3px 0px #888888',
  background: ' rgb(0,210,229)',
  background: '-moz-linear-gradient(top, rgba(0,210,229,1) 0%, rgba(0,175,198,1) 100%)',
  background: '-webkit-linear-gradient(top, rgba(0,210,229,1) 0%,rgba(0,175,198,1) 100%)',
  background: 'linear-gradient(to bottom, rgba(0,210,229,1) 0%,rgba(0,175,198,1) 100%)',
  filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#00d2e5", endColorstr="#00afc6",GradientType=0 )'
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
class UpcomingVideoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: this.props.movieP.trailers,
      video: null
    };
  }
  componentDidUpdate() {
    this.render();
  }
  componentDidMount() {
    if (this.state.videos.length > 0) {
      this.setState({
        video: this.state.videos[0].key
      });
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Movie Data"
        primary={true}
        style={{float: 'left'}}
        onClick={this.props.switchToDataModal}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.props.closeModal}
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
          <ReactPlayer style={{ width: '100%',
            height: '100%',
            margin: 'auto',
          }} url={'https://www.youtube.com/watch?v=' + this.state.video}/>
        </Dialog>
      </div>
    );
  }
}
export default UpcomingVideoModal;
