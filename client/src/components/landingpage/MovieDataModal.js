import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';

const customContentStyle = {

  background: '#999999',
  width: '60%',
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

const customInBoxStyle = {
  padding: '0px 0px 0px',
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
    color: 'rgb(0, 188, 212)'
  },
};
class MovieDataModal extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props, '%%%$$^^');
    this.state = {
      similar: this.props.movieP.similar
    };

    // this.renderSimilar = this.renderSimilar.bind(this);
  }

  render() {

    const actions = [
      <FlatButton
        label="Movie Trailers"
        primary={true}
        style={{float: 'left'}}
        onClick={this.props.switchToVideoModal}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.props.closeModal}
      />,
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
          <div className="container" style={customInBoxStyle}>>
            <div className="row">
              <div className="col-md-6">
                <p></p>
                <img
                  className="img-responsive"
                  src={this.props.movieP.poster}
                  style={{
                    width: '100%',
                  }}/>
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
                  {(this.props.movieP.ratings).map( value => {
                    return (<p>{value['Source']}: {value['Value']}</p>);
                  })}
                  <div style={styles.gridlist}>
                    <GridList style = {styles.gridlist} className='gridList' cellHeight='auto' cols={2.2}>
                      <Subheader><strong>Similar Movies</strong></Subheader>
                      {
                      }

                    </GridList>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
export default MovieDataModal;
