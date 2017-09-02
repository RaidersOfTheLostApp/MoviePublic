import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className='muiThemeProvider'>
          <div className="page-header text-center">
            <h1><span className="fa fa-anchor"></span> Profile Page</h1>
            <a href="/" className="btn btn-default btn-sm">Home page</a>
            <a href="/logout" className="btn btn-default btn-sm">Logout</a>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="well">
                <h3><span className="fa fa-user"></span> Local</h3>
                {userFromServer.email ? (
                  <div>
                    <p>
                      <strong>display name</strong>: {userFromServer.display}<br/>
                      <strong>id</strong>: {userFromServer.id}<br/>
                      <strong>email</strong>: {userFromServer.email}
                    </p>
                    <a href="/unlink/local" className="btn btn-default">Unlink</a>
                  </div>
                ) : (
                  <a href="/connect/local" className="btn btn-default">Connect Local</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<UserProfile />, document.getElementById('profile'));
