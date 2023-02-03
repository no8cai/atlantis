import React from 'react';
import { Route, Switch, NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InventoryList from './InventorList';
import CreatProduct from '../Product/CreateProduct';
import EditProduct from '../Product/EditProduct';
import logo from '../Navigation/atlogoseller.png'


function SellerCentral() {
    const sessionUser = useSelector(state => state.session.user);


    return(
        <div>
            <div className='sellerc-navbar'>
                <div>
                    <NavLink to={`/sellercentral`} className="sellercentral-links">
                    <div className='sellercbar-topleft'>
                    <img className='navigation-sublogo' src={logo}/>
                    <div className='sellercbar-context'>Seller Central</div>
                    </div>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={`/`} className="sellercentral-links">
                    <div className='sellercbar-context'><i className="fa-solid fa-house"/>Atlantis Home</div>
                    </NavLink>
                </div>
            </div>
            <div className='sellercentral-buttomsec'>
                <NavLink to={`/sellercentral`} className="sellercentral-links">
                <div className='sellercentral-innernav'>Manage your Inventory</div>
                </NavLink>
                <NavLink to={`/createproduct`} className="sellercentral-links">
                <div className='sellercentral-innernav'>Add a Product</div>
                </NavLink>
            </div>
            <Switch>
              <Route exact path={'/createproduct'}>
              <CreatProduct/>
              </Route>
              <Route path={'/editproduct/:productId'}>
              <EditProduct/>
              </Route>
              <Route exact path={'/sellercentral'}>
              <InventoryList/>
              </Route>
            </Switch>
        </div>
    )
}
export default SellerCentral;

