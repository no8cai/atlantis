import React from 'react';
import { Route, Switch, NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SellerCentral() {
    const sessionUser = useSelector(state => state.session.user);

    

    return(
        <div>
            <div>top bar</div>
            <div>
                <div>Add a Product</div>
                <div>Manage Inventory Inventory</div>
            </div>
            <div></div>
        </div>
    )
}
export default SellerCentral;

