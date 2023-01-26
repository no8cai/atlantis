import Navigation from "../Navigation";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from "../../store/session";
import Homepage from "./Homepage";
import SingleProduct from "../SingleProduct";


function Landing() {

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

    return(
        <div>
        <Navigation/>
        <Switch>
        <Route path="/products/:productId">
          <SingleProduct/>
        </Route>
         <Route path="/" exact={true}>
          <Homepage/>
        </Route>
        </Switch>
        {/* <Navigation isLoaded={loaded} />  */}
        </div>
    )
}

export default Landing;