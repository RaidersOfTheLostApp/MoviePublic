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
      amazon: false
    };
  }

  handleToggle(e, isInputChecked) {
    var stateObj = {};
    stateObj[e.target.id] = isInputChecked;
    this.setState(stateObj);
  }

  handleNext() {
    if (this.state.stepIndex === 2) {
      //update database with VOD updates
      $.ajax({
        method: 'POST',
        url: '/api/profiles',
        data: {
          netflix: this.state.netflix,
          hbo: this.state.hbo,
          hulu: this.state.hulu,
          amazon: this.state.amazon
        },
        success: (user) => {
          user = JSON.parse(user);
          console.log('********* success vod update user ', user);
        },
        error: (error) => {
          console.log('************* update vod handleNext ERROR:', error);
        }
      });
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
              <StepLabel>Select Movies, Actors, Directors, and Screenwriters to Follow</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Your VOD Subscriptions</StepLabel>
            </Step>
          </Stepper>
          <div>
            {this.state.finished ? (
              <p>
                <a href="/">Get Started Now!</a>
              </p>
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
                    <FollowSetup header={this.getStepContent(this.state.stepIndex)}/>
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
