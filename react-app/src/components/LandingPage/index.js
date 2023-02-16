import Navigation from "../Navigation";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from "../auth/ProtectedRoute";
import { useDispatch } from 'react-redux';
import { authenticate } from "../../store/session";
import Homepage from "./Homepage";
import SingleProduct from "../SingleProduct";
import CartItems from "../CartItem";
import Footer from "../Footer";
import Orderpage from "../Order";
import CreateReview from "../Review/CreateReview";
import EditReview from "../Review/EditReview";
import DocAlphabot from "../Aichater/DocAlpha";
import FilterNavBar from "../Filter/FilterNav";
import FilterSearchPage from "../Filter/FilterPage";
import Searchpage from "../Filter/SearchPage";
import Error404page from "../Error/Error404";
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
        <FilterNavBar/>
        <Switch>
        <Route path='/discover/:filterItem' >
          <FilterSearchPage />
        </Route>
        <Route path='/search/:searchItem' >
          <Searchpage />
        </Route>
        <Route path="/products/:productId">
          <SingleProduct/>
        </Route>
        <Route path="/cartitems" exact={true}>
          <CartItems/>
        </Route>
        <Route path="/orderdetails" exact={true}>
          <Orderpage/>
        </Route>
        <ProtectedRoute path="/createreview/:productId">
          <CreateReview/>
        </ProtectedRoute>
        <ProtectedRoute path="/editreview/:reviewId">
          <EditReview/>
        </ProtectedRoute>
        <Route path="/docalpha/">
          <DocAlphabot/>
        </Route>
         <Route path="/" exact={true}>
          <Homepage/>
        </Route>
        <Route>
          <Error404page/>
        </Route>
        </Switch>
        <Footer/>
        {/* <Navigation isLoaded={loaded} />  */}
        </div>
    )
}

export default Landing;