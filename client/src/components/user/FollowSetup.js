import React from 'react';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';

class FollowSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow_movies: [],
      follow_genre: [],
      follow_actor: [],
      follow_director: [],
      follow_writer: [],
      movie_list: ['Raiders of the Lost Ark', 'Temple of Doom'],
      genre_list: ['Comedy', 'Horror', 'Drama'],
      actor_list: ['Jennifer Aniston', 'Brad Pitt'],
      director_list: ['Quentin Tarantino', 'Other directors'],
      writer_list: ['Quentin Tarantino', 'Other writers'],
      select_value: 0,
      hintText: ['Enter a Movie to Follow', 'Enter a Movie Genre to Follow', 'Enter an Actor/Actress to Follow', 'Enter a Director to Follow', 'Enter a Screenwriter to Follow'],
      dataSource: ['Raiders of the Lost Ark', 'Temple of Doom'] //need to pass this down as props for first render to work
    };
  }

  componentDidMount() {
    // data should be in format [{text: 'text for dropdown', id: <unique id>}, ..]
    //get all movie and id data
    //get all genre and id data
    //get all actor and id data
    //get all director and id data
    //get all writer and id data
    //set to state for datasources in autocomplete fields
    console.log('********** dataSource after Mount ', this.state.dataSource);
  }

  handleChange(e, i, value) {
    var dataSourceArr = [this.state.movie_list, this.state.genre_list, this.state.actor_list, this.state.director_list, this.state.writer_list];
    this.setState({
      select_value: value,
      dataSource: dataSourceArr[value]
    });
  }

  addFollow(chosenRequest, index) {
    //chosenRequest is the TextField input value OR text value of corresponding list item selected
    //index is index in dataSource of item selected OR -1 if entered with text
    this.setState({

    });
  }

  render() {
    const dataSourceConfig = {
      text: 'text',
      value: 'id'
    };
    return (
      <div className='vod'>
        <Subheader>{this.props.header}</Subheader>
        <br/><br/>
        <SelectField value={this.state.select_value} onChange={this.handleChange.bind(this)} autoWidth={true}>
          <MenuItem value={0} primaryText='Movie' />
          <MenuItem value={1} primaryText='Genre' />
          <MenuItem value={2} primaryText='Actor' />
          <MenuItem value={3} primaryText='Director' />
          <MenuItem value={4} primaryText='Screenwriter' />
        </SelectField>
        <br/>
        <AutoComplete
          hintText={this.state.hintText[this.state.select_value]}
          filter={AutoComplete.noFilter}
          dataSource={this.state.dataSource}
          dataSourceConfig={dataSourceConfig}
          maxSearchResults={10}
          onNewRequest={this.addFollow.bind(this)}
        />
        <Divider inset={true}/>
        <br/>
        <Subheader>Your Current Following:</Subheader>
        Display Movies, Genres, Actors, Directors, Screenwriters Here with DELETE keys
      </div>
    );
  }
}

export default FollowSetup;
