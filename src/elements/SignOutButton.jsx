import React from 'react';
import { Button } from 'react-bootstrap';
import { auth } from '../firebase';

const SignOutButton = () => (
  <a type="button" onClick={auth.doSignOut}>
    Sign Out
  </a>
);
export default SignOutButton;
