import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class Results extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          padding: '0px 30px 0px 30px'
        }}
      >
        <GridList
          cellHeight={200}
          cols={3}
          style={{
            overflowY: 'scroll'
          }}
        >
          {
            this.props.data.map( (movie, i) => {
              console.log('the data')
              return (
                <GridTile
                  key={i}
                  title={movie.title}
                  actionIcon={movie.poster}
                >
                </GridTile>
              )
            })
          }
        </GridList>
      </div>
    )
  }
}

export default Results;

