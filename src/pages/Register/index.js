import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { IconWeather } from '../../components/Icons';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import { addAuthUser, emailValidate, passwordValidate } from '../../utils';

const Register = () => {

  const [state, setState] = useState({
    location: null,
    email: '', 
    password: '',
    auth: false
  });

  const [error, setError] = useState({});
  const history = useHistory();

  const dropdownChangeHandler = (value) =>{
    setState(prevState => ({
      ...prevState,
      location: value
    }))
    setError(prevState => ({
      ...prevState,
      location: null
    }))
  }

  const inputChangeHandler = (key, value) => {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }))
    setError(prevState=> ({
      ...prevState,
      [key]: ''
    }))
  }

  const validateHandler = () => {
    const errorObj = {
      email: emailValidate(state.email),
      password: passwordValidate(state.password),
      location: state.location ? '' : 'Please select city'
    }
    setError(errorObj);
    if(errorObj.email || errorObj.password || errorObj.location){
      return false;
    }
    return true;
  }

  const signUpHandler = () => {
    if(validateHandler()) {
      const obj = {
        auth: true,
        ...state,
      }
      addAuthUser(obj);
      history.push('/');
    }
  };

  return (
    <div className="container auth-page">
      <div className="col-2 left-box">
        <div className="auth-wrap">
          <div className="heading-box">
            <h2>Sign Up</h2>
            <div className="caption">Welcome, we missed you!</div>
          </div>
          <div className="input-box">
            <div className="input-field">
              <label className="caption">City</label>
              <Dropdown cb={dropdownChangeHandler} error={error.location} />
            </div>
            <div className="input-field">
              <label className="caption">Your Email</label>
              <Input 
                placeholder="Enter Email Address" 
                onChange={(e) => inputChangeHandler('email', e.target.value)}
                error={error.email} 
              />
            </div>
            <div className="input-field">
              <label className="caption">Password</label>
              <Input 
                type="password" 
                placeholder="Enter Password" 
                onChange={(e) => inputChangeHandler('password', e.target.value)}
                error={error.password} 
                />
            </div>
            <div className="btn-group">
              <Button text="Sign Up" onClick={signUpHandler}/>
              <Link to="/login">Login</Link>
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

export default Register;
