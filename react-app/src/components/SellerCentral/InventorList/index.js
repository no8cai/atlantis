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
    else if(userprojects.length==0) return (<span className="sell-noitems">You don't have any inventory</span>)

    return(
        <div className='inventory-list'>
        
        <div className="projectlist-titles">
                    <div className="projectlist-titletext">Product Image</div>
                    <div className="projectlist-titletext">Product Title</div>
                    <div className="projectlist-titletext">Category</div>
                    <div className="projectlist-titletext">Listing Price</div>
                    <div className="projectlist-titletext">Product Brand</div>
                    <div className="projectlist-titletext">Product Color</div>
                    <div className="projectlist-titletext">More</div>
                </div>
        {userprojects.map(({ id, title,category,price,discount,brand,imageUrl,color}) => (
        <div className='managebox' key={id}>
            <div className='productlist-boxitem'>
            <NavLink to={`/products/${id}`} className="productlist-links">
            <div className="productlist-item">
                <img 
                src={imageUrl} className="productlist-image"
                onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                />
            </div>
            <div className="productlist-item">{`${title.slice(0,60)}...`}</div>
            <div className="productlist-item">{category}</div>
            <div className="productlist-item">{`$${price}`}</div>
            <div className="productlist-item">{brand.slice(0,15)}</div>
            <div className="productlist-item">{color.slice(0,10)}</div>
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