import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { PrivateRoute } from './components/HOC';
import { Dashboard } from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { getAuth } from './utils';

function App() {

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    if(auth && location.pathname !== '/'){
      history.push('/');
    }
  }, [history, location])

  return (
    <div className="app">
        <Switch>
          <PrivateRoute path="/" component={Dashboard} exact></PrivateRoute>
          <Route path="/login" component={Login} exact></Route>
          <Route path="/register" component={Register} exact></Route>
        </Switch>
    </div>
  );
}

export default App;
