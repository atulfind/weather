import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { getAuth } from '../../utils';


export const PrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        getAuth() ? (
        <Component {...props} />
        ) : <Redirect to="/login" />
      }
    />
  );
};
