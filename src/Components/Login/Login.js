import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './LoginSignup.css';


const LoginSignup = () => {

  const navigate = useNavigate(); 

  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [parentName, setParentName] = useState('');
  const [infantName, setInfantName] = useState('');
  const [infantAge, setInfantAge] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: loginEmail,
        password: loginPassword,
      });
      if (response.status === 200) {
        console.log('Login successful');
        navigate('/dashboard'); 
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : 'Server error');
    }
  };
  

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        parentName,
        infantName,
        infantAge: Number(infantAge), 
        email: signupEmail,
        password: signupPassword,
      });
      console.log('Signup successful', response.data);
      alert('Signup successful!');
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : 'Server error');
    }
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <div className="auth-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              placeholder="Email" 
              type="email" 
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input 
              placeholder="Password" 
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit" className="auth-button">Login</button>
            <div className="auth-switch">
              New User? <span onClick={() => setIsLogin(false)}>Sign Up</span>.
            </div>
          </form>
        </div>
      ) : (
        <div className="auth-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <input 
              placeholder="Parent Name" 
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
            <input 
              placeholder="Child's Name" 
              type="text"
              value={infantName}
              onChange={(e) => setInfantName(e.target.value)}
            />
            <input 
              placeholder="Child's Age" 
              type="number"
              value={infantAge}
              onChange={(e) => setInfantAge(e.target.value)}
            />
            <input 
              placeholder="Email" 
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input 
              placeholder="Password" 
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button type="submit" className="auth-button">Sign Up</button>
            <div className="auth-switch">
              Already have an account? <span onClick={() => setIsLogin(true)}>Log in</span>.
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
