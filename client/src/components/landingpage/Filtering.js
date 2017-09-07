import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 200,
  },
};

class Filtering extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange(event, index, value) {
    this.setState({value});
  } 

  render() {
    console.log(this.state.value);
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)}>
          <MenuItem value={1} primaryText="Director" />
          <MenuItem value={2} primaryText="Title" />
          <MenuItem value={3} primaryText="Year" />
          <MenuItem value={4} primaryText="Rating" />
          <MenuItem value={5} primaryText="Actors" />
        </DropDownMenu>
      </div>
    );
  }
}

export default Filtering;