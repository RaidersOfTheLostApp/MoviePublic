import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DemoVideo from './DemoVideo';
import FollowSetup from './FollowSetup';
import VODSetup from './VODSetup';

class UserSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      netflix: false,
      hbo: false,
      hulu: false,
      amazon: false,
      genreFollow: [], //TODO check if the user already has a following?
      actorFollow: [],
      directorFollow: [],
      genreList: props.genres,
      actorList: props.actors,
      directorList: props.directors
    };
  }

  handleToggle(e, isInputChecked) {
    var stateObj = {};
    stateObj[e.target.id] = isInputChecked;
    this.setState(stateObj);
  }

  handleNext() {
    if (this.state.stepIndex === 0) {
      //update newUser field to false
      this.finishStepOne();
    }
    if (this.state.stepIndex === 1) {
      //update database with Follow List
      this.finishStepTwo();
    }
    if (this.state.stepIndex === 2) {
      //update database with VOD updates
      this.finishStepThree();
    }
    this.setState({
      finished: this.state.stepIndex >= 2,
      stepIndex: this.state.stepIndex + 1
    });
  }

  handlePrev() {
    if (this.state.stepIndex > 0) {
      this.setState({
        stepIndex: this.state.stepIndex - 1
      });
    }
  }

  finishStepOne() {
    $.ajax({
      method: 'POST',
      url: '/api/profiles/newUser',
      data: {
        newUser: false
      },
      success: (user) => {
        user = JSON.parse(user);
        console.log('********* success new user field updated ', user);
      },
      error: (error) => {
        console.log('************* update new user field handleNext ERROR:', error);
      }
    });
  }

  finishStepTwo() {
    if (this.state.genreFollow.length > 0) {
      $.ajax({
        method: 'POST',
        url: '/api/profiles/follows/genres',
        data: {
          genreFollow: this.state.genreFollow
          //format of values: [{'text': chosenRequest, 'id': null},...]
        },
        success: (user) => {
          user = JSON.parse(user);
          console.log('********* success user setup follow Genres ', user);
        },
        error: (error) => {
          console.log('************* update Genre follow list handleNext ERROR:', error);
        }
      });
    }

    if (this.state.actorFollow.length > 0) {
      $.ajax({
        method: 'POST',
        url: '/api/profiles/follows/actors',
        data: {
          actorFollow: this.state.actorFollow
        },
        success: (user) => {
          user = JSON.parse(user);
          console.log('********* success user setup follow Actors ', user);
        },
        error: (error) => {
          console.log('************* update Actors follow list handleNext ERROR:', error);
        }
      });
    }

    if (this.state.directorFollow.length > 0) {
      $.ajax({
        method: 'POST',
        url: '/api/profiles/follows/directors',
        data: {
          directorFollow: this.state.directorFollow
        },
        success: (user) => {
          user = JSON.parse(user);
          console.log('********* success user setup follow Directors ', user);
        },
        error: (error) => {
          console.log('************* update Directors follow list handleNext ERROR:', error);
        }
      });
    }
  }

  finishStepThree() {
    $.ajax({
      method: 'POST',
      url: '/api/profiles/vod',
      data: {
        netflix: this.state.netflix,
        hbo: this.state.hbo,
        hulu: this.state.hulu,
        amazon: this.state.amazon
      },
      success: (user) => {
        user = JSON.parse(user);
        console.log('********* success user setup vod update ', user);
      },
      error: (error) => {
        console.log('************* update vod handleNext ERROR:', error);
      }
    });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
    case 0:
      return null;
    case 1:
      return 'Follow to Get Notifications';
    case 2:
      return 'Select Your VOD Subscriptions';
    default:
      'New Account Setup Instructions';
    }
  }

  updateFollowList(followName, latestFollow) {
    this.setState({
      followName: this.state[followName].push(latestFollow)
    });
  }

  render() {
    return (
      <div className='muiThemeProvider'>
        <Subheader>New Account Setup</Subheader>
        <List>
          <ListItem
            leftIcon={<Avatar src={this.props.user.avatar} />}
            primaryText={this.props.user.display}
          />
        </List>
        <Divider />
        <div className='stepper'>
          <Stepper activeStep={this.state.stepIndex}>
            <Step>
              <StepLabel>Welcome to Movie Master!</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Genres, Actors and Directors to Follow</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Your VOD Subscriptions</StepLabel>
            </Step>
          </Stepper>
          <div>
            {this.state.finished ? (
              <h1 className='demoVideo'>
                <a href="/">Get Started Now!</a>
              </h1>
            ) : (
              <div>
                <div className='demoVideo'>
                  <div className='buttonOuter'>
                    <FlatButton className='flatButton' label='Back' disabled={this.state.stepIndex === 0} onClick={this.handlePrev.bind(this)} />
                    <RaisedButton label={this.state.stepIndex === 3 ? 'All Good' : 'Next'} primary={true} onClick={this.handleNext.bind(this)} />
                  </div>
                </div>
                {this.state.stepIndex === 0 ? (
                  <DemoVideo header={this.getStepContent(this.state.stepIndex)}/>
                ) : (
                  this.state.stepIndex === 1 ? (
                    <FollowSetup header={this.getStepContent(this.state.stepIndex)}
                      genreList={this.state.genreList}
                      actorList={this.state.actorList}
                      directorList={this.state.directorList}
                      genreFollow={this.state.genreFollow}
                      actorFollow={this.state.actorFollow}
                      directorFollow={this.state.directorFollow}
                      updateFollowList={this.updateFollowList.bind(this)}/>
                  ) : (
                    <VODSetup header={this.getStepContent(this.state.stepIndex)} handleToggle={this.handleToggle.bind(this)}/>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserSetup;
