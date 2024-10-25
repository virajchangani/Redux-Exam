import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        await signInWithPopup(auth, provider)
            .then(user => {
                console.log(user);
            });
    };

    const handleUserSignUp = () => {
        setSignupError('');

        if (userPassword !== userConfirmPassword) {
            setSignupError('Passwords do not match');
            return;
        }

        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);
                setDoc(doc(db, 'users', user.uid), {
                    firstName: userFirstName,
                    lastName: userLastName,
                    email: userEmail,
                    phoneNumber: userPhoneNumber,
                })
                    .then(() => {
                        console.log('User data stored in Firestore');
                        setUserFirstName('');
                        setUserLastName('');
                        setUserEmail('');
                        setUserPassword('');
                        setUserConfirmPassword('');
                        setUserPhoneNumber('');
                        navigate('/'); // Navigate after successful signup
                    })
                    .catch((error) => {
                        console.error('Error storing user data:', error);
                        setSignupError(error.message);
                    });
            })
            .catch((error) => {
                setSignupError(error.message);
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center"  style={{ minHeight: '100vh' }}>
            <div className="signup-wrapper border p-4 rounded shadow" id='f1'>
                <h1 className="signup-header mb-4">Sign Up</h1>

                <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="First Name"
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Last Name"
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Phone Number"
                    value={userPhoneNumber}
                    onChange={(e) => setUserPhoneNumber(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Confirm Password"
                    value={userConfirmPassword}
                    onChange={(e) => setUserConfirmPassword(e.target.value)}
                />

                <button className="btn btn-primary w-100 mb-3" onClick={handleUserSignUp}>
                    Sign Up
                </button>
                {signupError && <p className="text-danger mt-3">{signupError}</p>}
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/">Login</Link>
                </p>
                <p className="text-center">--------------- OR ---------------</p>
                
<button class="button" onClick={handleGoogleSignIn} >
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" class="svg">
  <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" class="blue"></path>
  <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" class="green"></path>
  <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" class="yellow"></path>
  <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" class="red"></path>
</svg>
<span class="text">Continue with Google</span>
</button>
            </div>
        </div>
    );
};

export default SignUp;
