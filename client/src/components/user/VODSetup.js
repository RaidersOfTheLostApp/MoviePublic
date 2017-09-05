import React from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

class VODSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleToggle(e, isInputChecked) {

  }

  render() {
    return (
      <div className='vod'>
        <table>
          <thead>
            <tr>
              <th colSpan='2'><Subheader>{this.props.header}</Subheader></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img style={{width: '29px'}} src="/assets/netflix.png"/>
              </td>
              <td>
                <Toggle className='toggle' label='Netflix' onToggle={this.handleToggle.bind(this)}/>
              </td>
            </tr>
            <tr>
              <td>
                <img style={{width: '29px'}} src="/assets/hbogo.png"/>
              </td>
              <td>
                <Toggle className='toggle' label='HBO GO' onToggle={this.handleToggle.bind(this)} />
              </td>
            </tr>
            <tr>
              <td>
                <img style={{width: '29px'}} src="/assets/hulu.png"/>
              </td>
              <td>
                <Toggle className='toggle' label='Hulu' onToggle={this.handleToggle.bind(this)} />
              </td>
            </tr>
            <tr>
              <td>
                <img style={{width: '29px'}} src="/assets/amazon.png"/>
              </td>
              <td>
                <Toggle className='toggle' label='Amazon Video' onToggle={this.handleToggle.bind(this)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default VODSetup;
