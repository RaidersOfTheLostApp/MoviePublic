import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(event) {
    this.setState({searchTerm: event.target.value});
  }

searchToServer() {
  var searchInput = document.getElementById('text-field').value;
  console.log(searchInput);
   $.ajax({
      url: '/search',
      method: 'GET',
      data: {value: searchInput},
      dataType: 'json',
      contentType: 'text/plain',
      success: (results) => {
        console.log(results);
      },
      error: (err) => {
        console.log('err', err);
      }
  })
}

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '15px'
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', flexWrap: 'nowrap',
        }}>
          <div style={{
            paddingLeft: '30px'
          }}>
            <TextField
              hintText="Search movies..."
              id = "text-field"
              underlineFocusStyle={{
                borderColor: 'rgb(40, 130, 150)',
                borderBottomStyle: 'solid',
                borderBottomWidth: 2,
                transform: 'scaleX(0)',
              }}
              style={{
                width: '500px'
              }}
            />
            <button onClick={this.searchToServer} type="button" id = "submit">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;