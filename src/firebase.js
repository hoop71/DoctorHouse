import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyBF7GCoUSa8BcDTE3yIqfgZWsW_s6GwPN8',
	authDomain: 'fcreact888.firebaseapp.com',
	databaseURL: 'https://fcreact888.firebaseio.com',
	projectId: 'fcreact888',
	storageBucket: 'fcreact888.appspot.com',
	messagingSenderId: '666473387630'
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
