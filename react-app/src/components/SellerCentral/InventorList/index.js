import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { fetchAllProducts } from "../../../store/product";
import "../SellerCentral.css"

function InventoryList() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const productsObj = useSelector(state => state.products)
    const userprojects=Object.values(productsObj).filter(el=>el.creatorId==sessionUser.id)
    
    const history=useHistory();
    

    useEffect(() => {
        dispatch(fetchAllProducts());
  }, [dispatch]);

    const editEvents=(id)=>{
    history.push(`/editproduct/${id}`)
    }

    if(!productsObj) return null
    else if(userprojects.length==0) return (<span>You dont have any inventory</span>)

    return(
        <div className='inventory-list'>
        
        {userprojects.map(({ id, title,category,price,discount,brand,imageUrl,color}) => (
        <div className='managebox' key={id}>
            <div className='productlist-boxitem'>
            <NavLink to={`/products/${id}`} className="productlist-links">
            <div className="productlist-item">
                <img src={imageUrl} className="productlist-image"/>
            </div>
            <div>{title}</div>
            <div>{category}</div>
            <div>{price}</div>
            <div>{brand}</div>
            <div>{color}</div>
            </NavLink>
            </div>
            <div className="productlist-buttonsec">
            <div onClick={()=>editEvents(id)} className="productlist-buttons">Edit this Product</div>
            </div>
        </div>
      ))}               
        </div>
    )
}
export default InventoryList;