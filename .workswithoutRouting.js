import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { storage, auth } from '../../firebase/firebase';
import LoginPage from 'views/Pages/LoginPage.jsx';
import Dash from 'containers/Dash/Dash.jsx';
import Pages from 'containers/Pages/Pages.jsx';

// dinamically create app routes
import appRoutes from 'routes/app.jsx';

class App extends Component {
  state = {
    userAuthed: false,
    loading: true
  };

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.action === 'PUSH' &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
  }
  render() {
    return (
      <Switch>
        <Route
          path="/dashboard"
          component={props => <Dash authed={this.state.userAuthed} {...props} />}
          authed={this.state.authed}
          {...this.props}
        />
        <Route path="/pages/user-page" component={Pages} />
      </Switch>
    );
  }
}

export default App;
