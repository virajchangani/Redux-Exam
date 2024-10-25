import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig'; 
import { Link, useNavigate } from 'react-router-dom';  
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import googleImg from './1.png'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const navigate = useNavigate();  

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');  
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/dashboard');  
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleForgotPassword = () => {
        if (!forgotPasswordEmail) {
            setError("Please enter your email address.");
            return;
        }

        sendPasswordResetEmail(auth, forgotPasswordEmail)
            .then(() => {
                setError("Password reset email sent! Check your inbox.");
                setForgotPasswordEmail(''); 
                setShowForgotPassword(false); 
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="login-wrapper border p-4 rounded shadow">
                <h1 className="mb-4">Login</h1>
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                    Login
                </button>
                {error && <p className="text-danger">{error}</p>}
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/SignUp">Sign Up</Link>
                </p>
                <p className="text-center">--------------- OR ---------------</p>
                <button className="btn btn-light w-100 d-flex align-items-center" id='q1' onClick={handleGoogleSignIn}>
                    <img src={googleImg} alt="Google sign-up" style={{ width: '20px', marginRight: '10px' }} />
                    Login With Google
                </button>
                ------------------------------------------------------
                <p className="text-center mt-3">
                    <span className="link" onClick={() => setShowForgotPassword(true)}>Forgot Password?</span>
                </p>

             
                {showForgotPassword && (
                    <div className="modal fade show" style={{ display: 'block' }} id="forgotPasswordModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Reset Password</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowForgotPassword(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="email"
                                        className="form-control mb-3"
                                        placeholder="Enter your email"
                                        value={forgotPasswordEmail}
                                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowForgotPassword(false)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleForgotPassword}>Send Reset Link</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};  

export default Login;
