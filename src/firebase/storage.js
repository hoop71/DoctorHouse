import { storage } from './firebase';

// upload photo to storage

// export const doUploadUserProfilePhoto

export const doUploadUserProfilePhoto = id =>
  storage.child(`users/${id}`).put({
    profile_picture: ''
  });
