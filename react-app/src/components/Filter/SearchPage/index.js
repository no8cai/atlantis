import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchAllProducts } from "../../../store/product";
import { NavLink } from "react-router-dom";
import Error404page from "../../Error/Error404";


const Searchpage=()=>{


    const dispatch = useDispatch();
    const {searchItem}=useParams()
    const productsObj = useSelector(state => state.products)
    const searchproducts=Object.values(productsObj).filter(el=>{
        if(el.title.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.style.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.dimension.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.brand.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        }
        if(el.category.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.color.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.about.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        if(el.description.toLowerCase().includes(searchItem.toLowerCase())){
            return true
        } 
        return false})


    useEffect(() => {
        dispatch(fetchAllProducts());
      }, [dispatch]);

    

    if(!productsObj) return (<div className='sp-broken'><Error404page/></div>)
    else if(searchproducts.length==0) return (
        <div className="ftr-entiresec">
        <div className="ftr-title">Searching results by {`"${searchItem}"`}</div>
        <div className="ftr-itemsec">
        <div className="ftr-notfind">We can not find any product! Please try other words.</div>
        </div>
        </div>
    )

    return(
        <div className="ftr-entiresec">
         <div className="ftr-title">Searching results by {`"${searchItem}"`}</div>
        <div className="ftr-itemsec">
        {searchproducts.map(({ id, title,category,price,discount,brand,imageUrl,color}) => (
        <div className='fp-itemsec' key={id}>
            <div className='fp-boxitem'>
            <NavLink to={`/products/${id}`} className="fp-links">
            <div className="fp-imageitem">
            <img 
                src={imageUrl} className="ftr-image"
                onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                />
            </div>

            <div className="fp-item fp-price">{`$${(price*discount).toFixed(2)}`}</div>
            <div className="fp-item fp-listprice">${price}</div>
            <div className="Prime fp-prime">Prime</div>
            <div className="fp-item">{`${title.slice(0,40)}...`}</div>
            <div className="fp-item fp-category">{category}</div>
            </NavLink>
            </div>
        </div>
      ))}               

        </div>
        </div>
    )
}

export default Searchpage