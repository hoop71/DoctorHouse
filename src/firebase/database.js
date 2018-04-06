import { database } from './firebase';

// User API

export const doCreateUser = (id, first, last, email) =>
    database.child(`users/${id}`).set({
        first: first,
        last: last,
        email: email,
        address: '',
        profile_picture: '',
        city: '',
        state: '',
        country: '',
        aboutMe: ''
    });

export const onceGetUsers = () => database.ref('users').once('value');

// update user field
// export const doUpdateUserPhoto = newData => {
//     database.child(`users/${id}`).set({
//         profile_picture: newData
//     });
// };

// Other db APIs ...
