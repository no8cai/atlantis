import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { fetchUserCartItems } from "../../store/cartitem";
import { fetchUpdateCartItem } from "../../store/cartitem";
import { fetchDeleteCartItem } from "../../store/cartitem";
import './CartItem.css'

function CartItems() {
     
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const cartitemsObj = useSelector(state => state.cartitems);
    const usercartitems=Object.values(cartitemsObj)
    const history=useHistory();


    useEffect(() => {
        dispatch(fetchUserCartItems());
  }, [dispatch]);


    const arrGenerator=(num,limit)=>{
        let inputnum
        if(num<=limit && num<=10){
            inputnum=11
        }
        else if(num<=limit && num>10){
            inputnum=parseInt(num)+1
        }
        else{
            inputnum=parseInt(limit)+1
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

    const checkoutEvents=()=>{
        let itemsidarr=usercartitems.map((el)=>el.id)
        itemsidarr.forEach(itemid => {
            dispatch(fetchDeleteCartItem(itemid))
        });
    }

    const noitemEvents=()=>{
        history.push('/')
    }
    
    const total=0
    const totalamount=(amount)=>{
        total+=amount
    }

    if(!cartitemsObj) return null
    else if(usercartitems.length==0) return (
        <div className="cartitem-section">
        <div className='cartitem-list'>
            <div>
                <div className="cartitem-title">Shopping Cart</div>
                <div className="cartitem-lable">
                <div>Items</div>
                <div>Price</div>
                </div>
            </div>

        <div className="cartitem-listitems">
            <div>Your Atlantis Cart is empty</div>
        </div>
        </div>
        <div className="cartitem-checkoutsec">
            <div>{`Subtotal (${usercartitems.length} item):`}</div>
            <div className="cartitem-checkoutbuttom" onClick={()=>noitemEvents()}>Countinue shopping</div>
        </div>
    </div>
    
    )

    return(
    <div className="cartitem-section">
        <div className='cartitem-list'>
            <div>
                <div className="cartitem-title">Shopping Cart</div>
                <div className="cartitem-lable">
                <div>Items</div>
                <div>Price</div>
                </div>
            </div>

        <div className="cartitem-listitems">
        {usercartitems.map(({ id,quantity,user,product}) => (
        <div className="carritem-listleftsec">
        <div className='cartitem-item' key={id}><NavLink to={`/products/${product.id}`}>
            <div className='cartitem-itemimg'><img src={product.imageUrl} className="cartitem-image"/></div>

        </NavLink>
        
        <div>
            <div>{product.title}</div>
            <div className='singleproduct-stock'>In Stock</div>
             

            <div className='singleproduct-primeday'>
                    <div className='Prime'>Prime</div> 
                    <div className='singleproduct-decocontext'>&FREE Returns</div>
            </div>
            <div>FREE delivery within 1 day</div>
                
            <div>Color:</div>
            <div>{product.color}</div>
        
        <div className="cartitem-selectionsec">
        <div>
            <select
                onChange={(e) =>{
                    updateQuantity(id,e.target.value)
                    return e.target.value}}
                value={quantity}
                >
                {arrGenerator(quantity,product.inventory).map(number => (
                                <option key={number} value={number}> {number}</option>
                            ))}
             </select>
        </div>
        
        <div>
        <button onClick={()=>deleteEvents(id)} className='buttons'>Delete</button>
        </div>
        </div>


        </div>
        </div>
        <div className="carritem-listrightsec">{`$${product.price*product.discount*quantity}`}</div>
        </div>
      ))}
        </div>
        </div>
        <div className="cartitem-checkoutsec">
         
        <div>{`Subtotal (${usercartitems.length} ${usercartitems.length==1?'item':'items'}):`}</div>
            {/* <div>{`Subtotal (${usercartitems.length} ${usercartitems.length==1?'item':'items'}):$${usercartitems.length==1? 
                usercartitems[0].quantity*usercartitems[0].product.price*usercartitems[0].product.discount:
                usercartitems.reduce((
                ac,cur)=>ac.quantity*ac.product.price*ac.product.discount
                +cur.quantity*cur.product.price*cur.product.discount
                )}`}</div> */}

            <div className="cartitem-checkoutbuttom" onClick={()=>checkoutEvents()}>Proceed to checkout</div>
        </div>
    </div>
    )
    

}

export default CartItems;