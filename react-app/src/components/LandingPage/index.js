import Navigation from "../Navigation";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from "../../store/session";
import Homepage from "./Homepage";
import SingleProduct from "../SingleProduct";
import CartItems from "../CartItem";
import Footer from "../Footer";
import './LandingPage.css';

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
        <Route path="/cartitems" exact={true}>
          <CartItems/>
        </Route>
         <Route path="/" exact={true}>
          <Homepage/>
        </Route>
        </Switch>
        <Footer/>
        {/* <Navigation isLoaded={loaded} />  */}
        </div>
    )
}

export default Landing;