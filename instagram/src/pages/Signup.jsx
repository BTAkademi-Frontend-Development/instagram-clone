/* eslint-disable */

import { React, useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [userName, setuserName] = useState('');
  const [fullName, setfullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '' || userName === '' || fullName === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(userName);
    console.log(usernameExists);

    if(!usernameExists.length){
        try {
            const createdUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress,password);

            await createdUserResult.user.updateProfile({ displayName: userName});

            await firebase.firestore().collection('users').add({ userId: createdUserResult.user.uid,
            username: userName.toLowerCase(), fullName, emailAddress: emailAddress.toLowerCase(), following: [], dateCreated: Date.now() });

            history.push(ROUTES.DASHBOARD);
        } catch(error) {
            setuserName('');
            setfullName('');
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        } 
    } else {
        setError('This username is already taken.');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  });

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
     <div className="flex w-3/5">
      <img className="max-w-full" alt="instagram" src="images/iphone-with-profile.jpg"/>
     </div>
     <div className="flex flex-col w-2/5">
         <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
        <h1 className="flex justify-center w-full">
            <img className="mt-2 w-6/12 mb-4" alt="logo" src="images/logo.png" />
        </h1>
        {error && <p className="mb-4 text-xs text-red-primary"> {error} </p>}

        <form onSubmit={handleSignUp} method="post">
              <input
                aria-label="Enter your username"
                type="text"
                placeholder="Username"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setuserName(target.value)}
                value={userName}
             />
             <input
                aria-label="Enter your full name"
                type="text"
                placeholder="Fullname"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setfullName(target.value)}
                value={fullName}
             />
            <input
                aria-label="Enter your e-mail address"
                type="text"
                placeholder="E-mail address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
             />
             <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
             />
             <button 
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && ' opacity-50'}`}>
                Sign Up
             </button>
        </form>
     </div>
     <div className="flex justify-content items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
         <p className="text-sm">Have an account? {` `}
         <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">Login</Link>
         </p>
     </div>
     </div>
    </div>
  );
}
