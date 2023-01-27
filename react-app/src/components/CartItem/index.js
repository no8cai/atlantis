import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { fetchUserCartItems } from "../../store/cartitem";
import { fetchUpdateCartItem } from "../../store/cartitem";
import { fetchDeleteCartItem } from "../../store/cartitem";

function CartItems() {
     
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const cartitemsObj = useSelector(state => state.cartitems);
    const usercartitems=Object.values(cartitemsObj)
    const history=useHistory();


    useEffect(() => {
        dispatch(fetchUserCartItems());
  }, [dispatch]);


    const arrGenerator=(num)=>{
        let inputnum = 0
        if (parseInt(num)<=10){
            inputnum=parseInt(num)+1
        }else{
            inputnum=11
        }
        let arry=[...Array(inputnum).keys()]
        arry.shift()
        return arry
    }

    const updateQuantity = (id,quantity) => {
        const newcartitem={
            id:id,
            quantity:quantity
        }
        dispatch(fetchUpdateCartItem(newcartitem))
      };
    
    const deleteEvents=(id)=>{
        dispatch(fetchDeleteCartItem(id))
       }

    if(!cartitemsObj) return null
    else if(usercartitems.length==0) return (<span>You dont have any cartitem</span>)

    return(
        <div>
        <div className='cartitem-list'>
        {usercartitems.map(({ id,quantity,user,product}) => (
        <div className='cartitem-item' key={id}><NavLink to={`/products/${product.id}`}>
            <div className='cartitem-itemimg'><img src={product.imageUrl} className="cartitem-image"/></div>
            <div>{product.title}</div>
            <div>{product.price}</div>
            <div>{product.color}</div>
            <div>{quantity}</div>
        </NavLink>
        
        <div>
            <select
                onChange={(e) =>{
                    updateQuantity(id,e.target.value)
                    return e.target.value}}
                value={quantity}
                >
                {arrGenerator(product.inventory).map(number => (
                                <option key={number} value={number}> {number}</option>
                            ))}
             </select>
        </div>

        <div>
        <button onClick={()=>deleteEvents(id)} className='buttons'><i className="fa-solid fa-trash-can" />Delete</button>
        </div>
        </div>
      ))}               
        </div>
    </div>
    )
    

}

export default CartItems;