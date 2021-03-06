import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(event) {
    this.setState({searchTerm: event.target.value});
  }

  handleChange(event, index, value) {
    this.setState({
      searchCat: value
    });
    this.props.sortByRating(value);
  }

  render() {
    return (
      <div className='container'>
        <div className='searchRow row'>
          <div className='searchCol col-8'>
            <div className='padLeft'>
              <TextField
                hintText="Search movies..." id = "text-field"
                underlineFocusStyle={{
                  borderColor: 'rgb(40, 130, 150)',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: 2,
                  transform: 'scaleX(0)',
                }}
                style={{width: '300px'}}
              />
            </div>
          </div>
          <div className='col-4 buttonSearch'>
            <RaisedButton color="danger" label='Submit' primary={true} onClick={this.props.searchToServer} />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
