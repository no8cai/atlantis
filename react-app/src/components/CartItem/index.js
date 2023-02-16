import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { fetchUserCartItems } from "../../store/cartitem";
import { fetchUpdateCartItem } from "../../store/cartitem";
import { fetchDeleteCartItem } from "../../store/cartitem";
import { fetchCreateOrder } from "../../store/orderdetail";
import { fetchCreateOrderitem } from "../../store/orderitem";
import './CartItem.css'

function CartItems() {
     
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const cartitemsObj = useSelector(state => state.cartitems);
    const usercartitems=Object.values(cartitemsObj)
    const history=useHistory();
   
    let totalmoney=0

    usercartitems.forEach(el=>{
         if(el==null || el==0){
           totalmoney=0 
         }
         if(el.quantity>el.product.inventory){
            totalmoney+=el.product.inventory*el.product.price*el.product.discount
         }
         else{
            totalmoney+=el.quantity*el.product.price*el.product.discount
         }
    }) 

    useEffect(() => {
        dispatch(fetchUserCartItems());
  }, [dispatch]);


    const arrGenerator=(num,limit)=>{
        let inputnum
        if(num<=limit && num<=10 && limit<=10){
            inputnum=parseInt(limit)+1
        }
        else if(num<=limit && num<=10 && limit>10){
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
        const temporder={totalprice:totalmoney.toFixed(2)}
        let itemsidarr=usercartitems.map((el)=>el.id)

        dispatch(fetchCreateOrder(temporder))
        .then(result=>{
            
            usercartitems.forEach(item=>{
               const tempoderitem={
                productId:item.product.id,
                quantity:item.quantity,
                title:item.product.title,
                price:item.product.price*item.product.discount,
                imageUrl:item.product.imageUrl
               }
            dispatch(fetchCreateOrderitem(tempoderitem,result.id))
            })
       
        })
        .then(
            itemsidarr.forEach(itemid =>{
                dispatch(fetchDeleteCartItem(itemid))
            })
        )
        .catch(async (err)=>{
            const errobj=await err.json();
            // errors.push(errobj.message)
            // setValidationErrors(errors)
          });
    }

    const noitemEvents=()=>{
        history.push('/')
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
            <div className="cart-noitem">Your Atlantis Cart is empty</div>
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
            <div className='cartitem-itemimg'><img src={product.imageUrl} className="cartitem-image"
            onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
            /></div>

        </NavLink>
        
        <div className="ci-contextsec">
            <div className="ci-title">{product.title}</div>
            <div className='singleproduct-stock ci-subtext1'>In Stock</div>
             

            <div className='singleproduct-primeday'>
                    <div className='Prime'>Prime</div> 
                    <div className='singleproduct-decocontext'>&FREE Returns</div>
            </div>
            <div className='ci-subtext1'>FREE delivery within 1 day</div>

            <div className="ci-colorsec">   
            <div className="ci-color">Color:</div>
            <div>{product.color.slice(0,8)}</div>
            </div>
        <div className="cartitem-selectionsec">
        <div className='singleproduct-selectsec'>
            <select
                onChange={(e) =>{
                    updateQuantity(id,e.target.value)
                    return e.target.value}}
                value={quantity}
                >
                {arrGenerator(quantity,product.inventory).map(number => (
                                <option key={number} value={number}> {`Qty ${number}`}</option>
                            ))}
             </select>
        </div>
        
        <div className="ci-delete">
        <button onClick={()=>deleteEvents(id)} className='buttons'>Delete</button>
        </div>
        </div>


        </div>
        </div>
        <div className="carritem-listrightsec ci-price">{(quantity<product.inventory)?`$${(product.price*product.discount*quantity).toFixed(2)}`:`$${(product.price*product.discount*product.inventory).toFixed(2)}`}</div>
        </div>
      ))}
        </div>
        <div className="ci-underbar">
        <div className="ci-subtotal">{`Subtotal (${usercartitems.length} ${usercartitems.length==1?'item':'items'}): `}</div>
        <div className="ci-price">{`$${totalmoney.toFixed(2)}`}</div>
        </div>
        </div>
        <div className="cartitem-checkoutsec">
         
        <div className="ci-sidebar">
        <div className="ci-subtotal">{`Subtotal (${usercartitems.length} ${usercartitems.length==1?'item':'items'}): `}</div>
        <div className="ci-price">{`$${totalmoney.toFixed(2)}`}</div>
        </div>
            <div className="cartitem-checkoutbuttom" onClick={()=>checkoutEvents()}>Proceed to checkout</div>
        </div>
    </div>
    )
    

}

export default CartItems;