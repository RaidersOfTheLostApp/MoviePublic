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
  }

  // getFavoriteIcon() {
  //   // console.log('hi!');
  //   return (
  //     <IconButton />
  //       <FavoriteBorder color="green" />
  //     </IconButton>
  //   );
  // }

  render() {
    return (
      <div className='gridRoot'>
        <GridList cellHeight={200} cols={5} className='gridList'>
          <Subheader>Popular Movies</Subheader>
          {this.props.data.map((movie, i) => (
            <a key={i} href = {movie.Website} target = "_blank">
              <GridTile className='titleStyle' key={i}
                title={movie.title}
                actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                <img src = {movie.Poster}/>
              </GridTile>
            </a>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Results;
