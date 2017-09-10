import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import Search from './Search';
import Filtering from './Filtering';
import Results from './Results';

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

  render() {
    console.log(this.state, '10000');
    return (
      <div>
        <button onClick={this.openModal}>

          <GridTile
            key= {this.props.i}
            subtitle= {<span>by <b>{this.props.movieP.directors}</b></span>}
            title={this.props.movieP.title}
            actionIcon = {this.props.getFavoriteIcon(this.props.movieP)}
          >
            <img src = {this.props.movieP.poster}/>
            <h1>Modal Content</h1>
            <p>Etc.</p>
          </GridTile>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.movieP.title}</h2>
            <button onClick={this.closeModal}>close</button>
            <div className="row">
              <div className="col">
                <img src={this.props.movieP.poster}/>
              </div>

              <div className="col">
                <form>
                  <input />
                  <p><strong>Description</strong>: {this.props.movieP.description}</p>
                  <p><strong>Actors/Actresses:</strong>: {this.props.movieP.actors}</p>
                  <p><strong>Director</strong>: {this.props.movieP.directors}</p>
                  <p><strong>Release Date</strong>: {this.props.movieP.release_date}</p>
                  <p><strong>Genre</strong>: {this.props.movieP.genre}</p>
                  <p><strong>Runtime</strong>: {this.props.movieP.runtime}</p>

                  <a href={this.props.movieP.website} target="_blank">
                    <button>Movie Website</button>
                  </a>
                  <button>Purchase Ticket</button>
                </form>
              </div>

            </div>


          </Modal>
        </button>
      </div>
    );
  }
}

export default ResultsListItem;
