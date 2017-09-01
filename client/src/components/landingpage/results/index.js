import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class Results extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
    <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    }}
      >
        <GridList
          cellHeight={200}
          cols={3}
          style={{
          width: 500,
          height: 450,
          overflowY: 'auto',
          }}
        >
        <Subheader>December</Subheader>
          {this.props.data.map((movie, i) => (
                <GridTile
                  key={i}
                  title={movie.title}
                  actionIcon={movie.poster}
                >
                <img src = {movie.Website}/>
                </GridTile>
              
            ))}
        </GridList>
      </div>
    )
  }
}

export default Results;















