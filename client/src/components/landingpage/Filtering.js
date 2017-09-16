import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SelectField from 'material-ui/SelectField';
import $ from 'jquery';

const styles = {
  customWidth: {
    width: 200,
  },
};

class Filtering extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ratings: props.rating
      // genre: props.genre
    };
  }

  handleChange(event, index, value) {
    this.setState({
      ratings: value
    });
    this.props.sortByRating(value);
  }

  render() {
    // console.log(this.state.value);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-3 noPad'>
            <h4 className='sortLabel'>Sort by Rating</h4>
          </div>
          <div className='col noPad'>
            <SelectField value={this.state.ratings} onChange={this.handleChange.bind(this)} autoWidth={true}>
              <MenuItem value={10} primaryText="10 stars" />
              <MenuItem value={9} primaryText="9 stars" />
              <MenuItem value={8} primaryText="8 stars" />
              <MenuItem value={7} primaryText="7 stars" />
              <MenuItem value={6} primaryText="6 star" />
              <MenuItem value={5} primaryText="5 stars" />
              <MenuItem value={4} primaryText="4 stars" />
              <MenuItem value={3} primaryText="3 stars" />
              <MenuItem value={2} primaryText="2 stars" />
              <MenuItem value={1} primaryText="1 star" />
            </SelectField>
          </div>
        </div>
      </div>
    );
  }
}

export default Filtering;
