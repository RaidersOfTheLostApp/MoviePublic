import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
class VideoModal extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< 5196e1e71258bce9abe624f4dda9714ee131b0d1
=======
    // console.log(this.props, '@@@@');
>>>>>>> refactor search with counts and make save async
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
export default VideoModal;
