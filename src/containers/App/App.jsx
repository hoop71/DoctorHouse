import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth, database } from '../../firebase/firebase';

// dinamically create app routes
import appRoutes from 'routes/app.jsx';

const INITIAL_STATE = {
  user: null,
  userID: null,
  loading: true,
  first: null,
  last: null,
  email: null,
  address: null,
  city: null,
  state: null,
  country: null,
  aboutMe: null,
  userPhotoURL: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.userRef = null;
    this.state = {
      ...INITIAL_STATE
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.userRef = database.child('users/').child(currentUser.uid);
        console.log('userRef', this.userRef);
        console.log('User Singed In', currentUser);
        this.setState({
          currentUser: currentUser,
          userID: currentUser.uid,
          email: currentUser.email
        });
        this.userRef.on('value', snap => {
          this.setState({ user: snap.val() });
        });
        this.userRef.on('value', snap => {
          this.setState({
            first: snap.val().first,
            last: snap.val().last,
            city: snap.val().city,
            address: snap.val().address,
            country: snap.val().country,
            state: snap.val().state,
            aboutMe: snap.val().aboutMe,
            userPhotoURL: snap.val().userPhotoURL
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
    return (
      <Switch>
        {appRoutes.map((prop, key) => {
          return (
            <Route
              key={key}
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
