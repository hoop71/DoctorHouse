import { database } from './firebase';

// User API

export const doCreateUser = (id, first, last, email) =>
  database.child(`users/${id}`).set({
    first: first,
    last: last,
    email: email,
    address: '0',
    profile_picture: '0',
    city: '0',
    state: '0',
    country: '0',
    aboutMe: '0'
  });

export const onceGetUsers = () => database.ref('users').once('value');

// Other db APIs ...

