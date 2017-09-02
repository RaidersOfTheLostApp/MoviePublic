import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ReactPlayer from 'react-player';

class UserSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0
    };
  }

  handleNext() {
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
    switch (this.state.stepIndex) {
    case 0:
      return null;
    case 1:
      return 'Follow to Get Notifications';
    case 2:
      return 'VOD Subscriptions';
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
                  <p>{this.getStepContent(this.state.stepIndex)}</p>
                  <div className='buttonOuter'>
                    <FlatButton className='flatButton' label='Back' disabled={this.state.stepIndex === 0} onClick={this.handlePrev.bind(this)} />
                    <RaisedButton label={this.state.stepIndex === 2 ? 'All Good' : 'Next'} primary={true} onClick={this.handleNext.bind(this)} />
                  </div>
                </div>
                <br/><br/>
                <div className='demoVideo'>
                  <ReactPlayer url='https://www.youtube.com/watch?v=ZUG9qYTJMsI' playing />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserSetup;
// ReactDOM.render(<UserProfile />, document.getElementById('profile'));
