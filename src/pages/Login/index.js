import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { IconWeather } from '../../components/Icons';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import { emailValidate, passwordValidate, setAuth, getAuthUser } from '../../utils';

const Login = () => {

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({});
  const history = useHistory();

  const inputChangeHandler = (key, value) => {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }))
    setError(prevState => ({
      ...prevState,
      [key]: '',
      user: '',
    }))
  }

  const validateHandler = (auth) => {
    
    const errorObj = {
      email: emailValidate(state.email, auth && auth.email),
      password: passwordValidate(state.password, auth && auth.password),
      user: auth ? '' : 'Email does not exist'
    }
    setError(errorObj);
    if (errorObj.email || errorObj.password || errorObj.user) {
      return false;
    }
    return true;
  }

  const signInHandler = () => {
    const auth = getAuthUser(state.email);
    if (validateHandler(auth)) {
      const obj = {
        ...state,
        auth: true,
        location: auth.location
      }
      setAuth(obj);
      history.push('/');
    }
  };

  return (
    <div className="container auth-page">
      <div className="col-2 left-box">
        <div className="auth-wrap">
          <div className="heading-box">
            <h2>Sign In</h2>
            <div className="caption">Welcome, we missed you!</div>
          </div>
          <div className="input-box">
            <div className="input-field">
              <label className="caption">Your Email</label>
              <Input
                error={error.email || error.user }
                placeholder="Enter Email Address"
                onChange={(e) => inputChangeHandler('email', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label className="caption">Password</label>
              <Input
                error={error.password }
                type="password"
                placeholder="Enter Password"
                onChange={(e) => inputChangeHandler('password', e.target.value)}
              />
            </div>
            <div className="btn-group">
              <Button onClick={signInHandler} text="Login" />
              <Link to="/register">Create an Accont</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-2 right-box">
        <IconWeather />
      </div>
    </div>
  )
}

export default Login
