import React from "react"
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { fetchUserOrders } from "../../store/orderdetail";
import { fetchUserOrderitems } from "../../store/orderitem";
import { fetchAllReviews } from "../../store/review";
import { fetchDeleteOrder } from "../../store/orderdetail";
import { fetchDeleteOrderitem } from "../../store/orderitem";
import { fetchUpdateOrder } from "../../store/orderdetail";
import { removeItemsbyOrder } from "../../store/orderitem";

import "./Order.css"


const Orderpage=()=>{
   
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const ordersObj = useSelector(state => state.orders);
    const orderitemsObj = useSelector(state => state.orderitems);
    const reviewsObj = useSelector(state => state.reviews);
    const orderdetails=Object.values(ordersObj)
    const orderitems=Object.values(orderitemsObj)
    const userreviews=Object.values(reviewsObj).filter(el=>el.userId==sessionUser.id)
    const history=useHistory();

    useEffect(() => {
        dispatch(fetchUserOrders());
        dispatch(fetchUserOrderitems());
        dispatch(fetchAllReviews());
    }, [dispatch]);

    const createEvents=(id)=>{
        history.push(`/createreview/${id}`)
    }

    const editEvents=(id)=>{
        history.push(`/editreview/${id}`)
    }

    const titleEvents=(id)=>{
        history.push(`/products/${id}`)
    }

    const deleteorderEvents=(id)=>{
        let itemlistId=orderitems.filter(orderitem=>orderitem.orderId==id).map(el=>el.id)
        itemlistId.forEach(itemId=>{
            dispatch(fetchDeleteOrderitem(itemId))
        })
        dispatch(fetchDeleteOrder(id))
        dispatch(removeItemsbyOrder(id))
    }

    const deleteorderitemEvents=(id,orderId,price)=>{
        let temporder=ordersObj[orderId]
        temporder.totalprice-=price
        dispatch(fetchDeleteOrderitem(id))
        if(temporder.totalprice==0){
            dispatch(fetchDeleteOrder(orderId))
        }else{
            dispatch(fetchUpdateOrder(temporder))
        }
    }
   
    

    if((!ordersObj)||(!orderitemsObj)||(!reviewsObj)) return null
    else if(orderdetails.length==0) return (
        <div className="Od-secion">
            <div className="od-fristsec"> 
            <div className="od-fristtitle">Your Orders</div>    
            </div>
            <div className="od-secondsec">
            <div className="od-secondtitle">Orders</div>
            </div>
             <div className="od-nooders">
             <div className="od-nocontext">Your don't have any orders</div>
            </div>
        </div>
    )

    return(
        <div className="Od-secion">
            <div className="od-fristsec"> 
            <div className="od-fristtitle">Your Orders</div>    
            </div>
            <div className="od-secondsec">
            <div className="od-secondtitle">Orders</div>
            </div>
            <div className="od-thridsec">
            {orderdetails.slice(0).reverse().map(({ id,totalprice,createdAt,updatedAt}) => (
            <div key={id} className="od-entireordersec">
             <div className="od-ordersec">
             <div className="od-orderleft">
             <div>
             <div className="od-upcontext">ORDER PLACED</div>
             <div>{createdAt.slice(0,10)}</div>
             </div>
             <div>
             <div className="od-upcontext">TOTAL</div>
             <div>{`$${totalprice}`}</div>
            </div>
             <div>
             <div className="od-upcontext">SHIP TO</div>
             <div className="od-downcontext">{sessionUser.username}</div>
             </div>
             </div>
             <div className="od-orderright">
             <div className="od-upcontext">ORDER # 113-8668351-1854{id.toString().padStart(3,"0")}</div>
             <div onClick={()=>deleteorderEvents(id)} className="od-downcontext od-linkbutton">cancel order</div>
             </div>
             </div>
             <div>
             {orderitems.filter(orderitem=>orderitem.orderId==id).map(({id,quantity,price,title,imageUrl,productId,orderId}) => (
                <div key={id} className="od-itemsec">
                    <div className="od-itemleftsec">
                    <div className="od-itemcontext">Item will be delivered in one day</div>
                    <div>Your package will be left near the front door or porch.</div>
                    <div className="od-itemdetail">
                    <div className="od-imagesec">
                    <img  src={imageUrl} className="productlist-image"
                          onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                        />
                    </div>
                    <div className="od-leftright">
                    <div className="od-itemtitle" onClick={()=>titleEvents(productId)}>{title}</div>
                    <div className="od-subtitle">Return or replace items: Eligible through next month</div>
                  
                    </div>
                    </div>
                    </div>
                    <div className="od-itemrightsec">
                        <div className="od-itemsubright">
                        <div onClick={()=>deleteorderitemEvents(id,orderId,price)} className="od-clicksec"><div className="od-clickbutton">Cancel this item</div></div>
                        {userreviews.every(el=>el.productId!==productId)&&( 
                        <div onClick={()=>createEvents(productId)} className="od-clicksec"><div className="od-clickbutton">Write a product review</div></div>
                        )}
                        {!userreviews.every(el=>el.productId!==productId)&&( 
                        <div onClick={()=>editEvents(userreviews.filter(el=>el.productId==productId)[0].id)} className="od-clicksec"><div className="od-clickbutton">Edit a product review</div></div>
                        )}
                        </div>
                    </div>

                </div>
                ))}
             </div>
            </div>
            ))}
            </div>
        </div>
    )
}

export default Orderpage