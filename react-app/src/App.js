import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import SignupFormModal from './components/SignupFormModal';
import Landing from './components/LandingPage';
import SellerCentral from './components/SellerCentral';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      {/* <Navigation isLoaded={loaded} /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <Route path={["/sellercentral",'/createproduct','/editproduct/:productId']}>
          <SellerCentral />
        </Route>
        <Route path="/">
          <Landing/>
        </Route>
        {/* <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
