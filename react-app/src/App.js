import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Landing from './components/LandingPage';
import SellerCentral from './components/SellerCentral';
import UploadPicture from './components/file_upload/UploadPicture';
import ViewImages from './components/file_upload/ViewImages';
import Error404page from './components/Error/Error404';

import "./index.css"


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
    <div className="rootchild">
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path={["/sellercentral",'/createproduct','/editproduct/:productId']}>
          <SellerCentral/>
        </ProtectedRoute>
        {/* <Route path="/upload">
          <UploadPicture/>
        </Route>
        <Route path="/images">
          <ViewImages/>
        </Route> */}
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
          <Error404page/>
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
