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
    // console.log(userprojects)
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
        
        {userprojects.map(({ id, title,category,price,dicount,brand,imageUrl}) => (
        <div className='item' key={id}>
            <div>
            <NavLink to={`/products/${id}`}>
            <div className='itemimg'><img src={imageUrl} className="image"/></div>
            <div>{title}</div>
            </NavLink>
            </div>
            <div>
            <div onClick={()=>editEvents(id)} className="productlist-buttons"><i className="fa-regular fa-pen-to-square"/>Edit this Project</div>
            </div>
        </div>
      ))}               
        </div>
    )
}
export default InventoryList;