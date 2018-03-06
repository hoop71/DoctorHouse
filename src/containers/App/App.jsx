import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth, database } from '../../firebase/firebase';
import { map } from 'lodash';

// dinamically create app routes
import appRoutes from 'routes/app.jsx';

const INITIAL_STATE = {
  userAuthed: false,
  userID: null,
  loading: true,
  first: null,
  last: null,
  email: null,
  address: null,
  city: null,
  state: null,
  country: null,
  aboutMe: null
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAuthed: false,
      userID: null,
      loading: true,
      first: null,
      last: null,
      email: null,
      address: null,
      city: null,
      state: null,
      country: null,
      aboutMe: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        console.log('User Singed In', currentUser);
        this.setState({
          currentUser: currentUser,
          userID: currentUser.uid,
          email: currentUser.email,
          userAuthed: true,
          userPhotoURL: 'me',
          displayName: currentUser.displayName
        });
        database
          .child('users/')
          .child(`${this.state.userID}`)
          .once('value', snap => {
            this.setState({
              first: snap.val().first,
              last: snap.val().last,
              address: snap.val().address,
              city: snap.val().city,
              state: snap.val().state,
              country: snap.val().country,
              aboutMe: snap.val().aboutMe
            });
          });
      } else {
        console.log('User Singed Out', currentUser);
        this.setState(() => ({ ...INITIAL_STATE }));
      }
    });
  }
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
    const { currentUser, uid } = this.state;
    return (
      <Switch>
        {appRoutes.map((prop, key) => {
          return (
            <Route
              path={prop.path}
              render={routeProps => <prop.component {...routeProps} {...this.state} key={key} {...this.props} />}
            />
          );
        })}
      </Switch>
    );
  }
}

export default App;
