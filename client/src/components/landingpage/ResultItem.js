import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal';
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
    width: '100%'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

class ResultsListItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.movieP);
    console.log(this.props.i, 'CONSOLELOG');
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  componentDidMount() {
    this.render();
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.closeModal}
      />,
      <FlatButton
        label="Buy Tickets"
        primary={true}
      />
    ];
    return (
      <div>
        <GridTile
          key= {this.props.i}
          subtitle= {<span>by <b>{this.props.movieP.directors}</b></span>}
          title={this.props.movieP.title}
          actionIcon = {this.props.getFavoriteIcon(this.props.movieP)}
          onClick={this.openModal}
        >
          <img src = {this.props.movieP.poster} height="100%" width="100%"/>
        </GridTile>
        <Dialog
          title={this.props.movieP.title}
          titleStyle={customTitleStyle}
          modal={true}
          actions={actions}
          open={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
          contentClassName='dialog'
        >
          <div className="row">
            <div className="col">
              <p></p>
              <img src={this.props.movieP.poster}/>
            </div>

            <div className="col">
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
                  <p><GridList style={styles.gridList} cols={2.2}>
                    <GridTile
                      key= {this.props.i}
                      subtitle= {<span>by <b>{this.props.movieP.directors}</b></span>}
                      title={this.props.movieP.title}
                      actionIcon = {this.props.getFavoriteIcon(this.props.movieP)}
                    >
                      <img src = {this.props.movieP.poster} height="100%" width="100%"/>
                    </GridTile>
                  </GridList></p>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </div>

    );
  }
  //
  // render() {
  //   console.log(this.state, '10000');
  //   return (
  //     <div>
  //       <button onClick={this.openModal}>
  //
  // <GridTile
  //   key= {this.props.i}
  //   subtitle= {<span>by <b>{this.props.movieP.directors}</b></span>}
  //   title={this.props.movieP.title}
  //   actionIcon = {this.props.getFavoriteIcon(this.props.movieP)}
  // >
  //   <img src = {this.props.movieP.poster}/>
  //   <h1>Modal Content</h1>
  //   <p>Etc.</p>
  // </GridTile>
  //
  //         <Modal
  //           isOpen={this.state.modalIsOpen}
  //           onAfterOpen={this.afterOpenModal}
  //           onRequestClose={this.closeModal}
  //           contentLabel="Example Modal"
  //         >
  //           <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.movieP.title}</h2>
  //           <button onClick={this.closeModal}>close</button>
  // <div className="row">
  //   <div className="col">
  //     <img src={this.props.movieP.poster}/>
  //   </div>
  //
  //   <div className="col">
  //     <form>
  //       <input />
  //       <p><strong>Description</strong>: {this.props.movieP.description}</p>
  //       <p><strong>Actors/Actresses:</strong>: {this.props.movieP.actors}</p>
  //       <p><strong>Director</strong>: {this.props.movieP.directors}</p>
  //       <p><strong>Release Date</strong>: {this.props.movieP.release_date}</p>
  //       <p><strong>Genre</strong>: {this.props.movieP.genre}</p>
  //       <p><strong>Runtime</strong>: {this.props.movieP.runtime}</p>
  //
  //       <a href={this.props.movieP.website} target="_blank">
  //         <button>Movie Website</button>
  //       </a>
  //       <button>Purchase Ticket</button>
  //     </form>
  //   </div>
  //
  //           </div>
  //
  //
  //         </Modal>
  //       </button>
  //     </div>
  //   );
  // }
}

export default ResultsListItem;
