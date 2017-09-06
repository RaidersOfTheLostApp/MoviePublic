import React from 'react';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

class VODSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                <Toggle className='toggle' label='Netflix' id='netflix' onToggle={this.props.handleToggle}/>
              </td>
            </tr>
            <tr>
              <td>
                <img style={{width: '29px'}} src="/assets/hbogo.png"/>
              </td>
              <td>
                <Toggle className='toggle' label='HBO GO' id='hbo' onToggle={this.props.handleToggle} />
              </td>
            </tr>
            <tr>
              <td>
                <img style={{width: '29px'}} src="/assets/hulu.png"/>
              </td>
              <td>
                <Toggle className='toggle' label='Hulu' id='hulu' onToggle={this.props.handleToggle} />
              </td>
            </tr>
            <tr>
              <td>
                <img style={{width: '29px'}} src="/assets/amazon.png"/>
              </td>
              <td>
                <Toggle className='toggle' label='Amazon Video' id='amazon' onToggle={this.props.handleToggle} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default VODSetup;
