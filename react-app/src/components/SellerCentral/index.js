import React from 'react';
import { Route, Switch, NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InventoryList from './InventorList';
import CreatProduct from '../Product/CreateProduct';
import EditProduct from '../Product/EditProduct';

function SellerCentral() {
    const sessionUser = useSelector(state => state.session.user);


    return(
        <div>
            <div>
                <div>
                    <NavLink to={`/sellercentral`} className="sellercentral-links">
                    atlantis seller central
                    </NavLink>
                </div>
                <div>
                    <NavLink to={`/`} className="sellercentral-links">
                    <div>atlantis home</div>
                    </NavLink>
                </div>
            </div>
            <div>
                <NavLink to={`/createproduct`} className="sellercentral-links">
                <div>Add a Product</div>
                </NavLink>
                <NavLink to={`/sellercentral`} className="sellercentral-links">
                <div>Manage Inventory Inventory</div>
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

