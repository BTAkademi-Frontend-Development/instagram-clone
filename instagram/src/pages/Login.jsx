/* eslint-disable */

import { React, useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  // react forms, formik implementasyonu
  const [error, setError] = useState('');
  const isInvalid = emailAddress === '' || password === '';

  const handleLogin = async (event) => {
    event.preventDefault();
      
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD); //redirect
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - BTAkademi Instagram Clone';
  });

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img className="max-w-full" alt="iphone" src="/images/iphone-with-profile.jpg" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col item-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            {' '}
            {/* css-in-js implementasyonu */ }
            <img src="/images/logo.png" alt="logo" className="mt-2 w-6/12 mb-4" />
          </h1>
          { error && (
          <p className="mb-4 text-xs text-red text-red-primary">
            {error}
          </p>
          ) }
          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              placeholder="Enter your email address"
              className="text-sm text-gray base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="text-sm text-gray base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button disabled={isInvalid} type="submit" className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && ' opacity-50'}`}>
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Don&apos;t have an account?
            {' '}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
