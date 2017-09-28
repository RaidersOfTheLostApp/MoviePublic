import React from 'react';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';

class FollowSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select_value: 0,
      hintText: ['Enter a Movie Genre to Follow', 'Enter an Actor/Actress to Follow'], //'Enter a Director to Follow', 'Enter a Screenwriter to Follow'
      dataSource: props.genreList,
      latestFollow: '',
      addToDB: false,
      nonKey: 0
    };
  }

  getValue(index, callback) {
    var dropDownList = ['genre', 'actor', 'director'];
    callback(dropDownList[index]);
  }

  handleChange(e, i, value) {
    this.getValue(value, dataSourceName => {
      this.setState({
        select_value: value,
        latestFollow: '',
        addToDB: false,
        dataSource: this.props[dataSourceName + 'List']
      });
      this.clearSearchField(value);
    });
  }

  clearSearchField(value) {
    this.refs['autoComplete'].setState({
      searchText: '',
      hintText: this.state.hintText[value]
    });
    this.refs['autoComplete'].focus();
  }

  setLatestFollow(chosenRequest, index) {
    if (index === -1) {
      this.setState({
        latestFollow: {'id': 'nonKey' + this.state.nonKey++, 'text': chosenRequest},
        addToDB: true
      });
    } else {
      this.setState({
        latestFollow: {'id': this.state.dataSource[index]['id'], 'text': this.state.dataSource[index]['name']}
      });
    }
  }

  addFollow(e) {
    //TODO user entered field isn't showing up in box of currently following
    this.getValue(this.state.select_value, dataSourceName => {
      var followName = dataSourceName + 'Follow';
      if (this.state.latestFollow === '') {
        //not an existing value in the DB
        var enteredText = document.getElementById('follow-field').value;
        this.props.updateFollowList(followName, {'id': 'nonKey' + this.state.nonKey++, 'text': enteredText});
        this.setState({
          addToDB: true
        });
      } else if (!this.state.addToDB) {
        this.props.updateFollowList(followName, this.state.latestFollow);
        this.setState({
          latestFollow: ''
        });
      } else {
        //not an existing value in the DB
        //TODO add to a crone job to search for it? check if already exists in the job
        //crone job will have to check for non-id values in follow list and replace them as possible
        this.props.updateFollowList(followName, this.state.latestFollow);
        this.setState({
          addToDB: true,
          latestFollow: ''
        });
      }
    });
    this.clearSearchField(this.state.select_value);
  }

  render() {
    const dataSourceConfig = {
      text: 'name',
      value: 'id'
    };
    return (
      <div>
      <div className='follow container'>
        <div className='row'>
          <div className='col'>
            <Subheader>{this.props.header}</Subheader>
            <div className='row'>
              <div className='col'>
                <SelectField value={this.state.select_value} onChange={this.handleChange.bind(this)} autoWidth={true}>
                  <MenuItem value={0} primaryText='Genre' />
                  <MenuItem value={1} primaryText='Actor' />
                  <MenuItem value={2} primaryText='Director' />
                </SelectField>
              </div>
              <div className='col'>
                <AutoComplete
                  id='follow-field'
                  ref={'autoComplete'}
                  hintText={this.state.hintText[this.state.select_value]}
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={this.state.dataSource}
                  dataSourceConfig={dataSourceConfig}
                  maxSearchResults={10}
                  onNewRequest={this.setLatestFollow.bind(this)}
                />
              </div>
              <div className='col'>
                <FloatingActionButton className='floatButton' mini={true} onClick={this.addFollow.bind(this)}>
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col muiThemeProvider outline '>
            <div className='row'>
              <div className='col'>
                <Subheader>GENRES</Subheader>
                <List>
                  {this.props.genreFollow.map(genre =>
                    <ListItem key={genre.id}
                      leftIcon={<ActionGrade />}
                      primaryText={genre.text}
                    />
                  )}
                </List>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col muiThemeProvider outline '>
            <div className='row'>
              <div className='col'>
                <Subheader>ACTOR/ACTRESSES</Subheader>
                <List>
                  {this.props.actorFollow.map(actor =>
                    <ListItem key={actor.id}
                      leftIcon={<ActionGrade />}
                      primaryText={actor.text}
                    />
                  )}
                </List>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col muiThemeProvider outline '>
            <div className='row'>
              <div className='col'>
                <Subheader>DIRECTORS</Subheader>
                <List>
                  {this.props.directorFollow.map(director =>
                    <ListItem key={director.id}
                      leftIcon={<ActionGrade />}
                      primaryText={director.text}
                    />
                  )}
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default FollowSetup;
