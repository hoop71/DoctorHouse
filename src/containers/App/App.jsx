import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth, database, storage } from '../../firebase/firebase';
// dinamically create app routes
import appRoutes from 'routes/app.jsx';

//make a new context
export const AppContext = React.createContext();

const INITIAL_STATE = {
  userID: null,
  loading: true,
  first: null,
  last: null,
  email: null,
  address: null,
  city: null,
  state: null,
  photoUrl: null,
  country: null,
  aboutMe: null,
  profile_picture: null,
  userRef: null,
  storageRef: null,
  tree: false
};

// PROVIDER COMPONENT
class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      updateUserProfilePhoto: () => {
        this.setState({});
      }
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.setState({
          userRef: database.child('users/').child(currentUser.uid),
          storageRef: storage.child('users/').child(currentUser.uid)
        });
        console.log('userRef', this.state.userRef);
        console.log('User Singed In', currentUser);
        this.setState({
          currentUser: currentUser,
          userID: currentUser.uid,
          email: currentUser.email
        });

        this.state.userRef.on('value', snap => {
          console.log(snap);
          this.setState({
            loading: false,
            first: snap.val().first,
            last: snap.val().last,
            city: snap.val().city,
            address: snap.val().address,
            country: snap.val().country,
            state: snap.val().state,
            aboutMe: snap.val().aboutMe,
            photoURL: snap.val().profile_picture
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
      <AppContext.Provider
        value={{
          state: this.state
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

class App extends Component {
  render() {
    return (
      <AppProvider>
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
      </AppProvider>
    );
  }
}

export default App;
