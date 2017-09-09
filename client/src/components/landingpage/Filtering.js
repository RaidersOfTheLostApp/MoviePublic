import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';


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
      <div className='container'>
        <div className='row'>
          <div className='col-3 noPad'>
            <h4 className='sortLabel'>Sort by Rating</h4>
          </div>
          <div className='col noPad'>
            <DropDownMenu value={this.state.value} onChange={this.handleChange.bind(this)} autoWidth={true}>
              <MenuItem value={1} primaryText="5 stars" />
              <MenuItem value={2} primaryText="4 stars" />
              <MenuItem value={3} primaryText="3 stars" />
              <MenuItem value={4} primaryText="2 stars" />
              <MenuItem value={5} primaryText="1 star" />
            </DropDownMenu>
          </div>
        </div>
      </div>
    );
  }
}

export default Filtering;
