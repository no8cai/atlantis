import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom';
import { fetchAllProducts } from '../../store/product';
import "./SingleProduct.css"

function SingleProduct() {
    
    const { productId } = useParams();
    const dispatch = useDispatch();
    const singleproduct = useSelector(state => state.products[productId])
    console.log(singleproduct)

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);
    
    if(!singleproduct) return (<div className='sp-broken'>This page was not able to load</div>)

    return (
        <div>
           <div className='singleproject-topsec'>
             <div className='singleproject-imagesec'><img src={singleproduct.imageUrl} className="singleproduct-image"/></div>
             <div>
                <div>{singleproduct.title}</div>
                <div>{singleproduct.price}</div>
                <div>{singleproduct.style}</div>
                <div>{singleproduct.about}</div>
             </div>
             <div>
                <div>Buy new:</div>
                <div>{singleproduct.price}</div>
                <div>In stock</div>

             </div>
           </div>
           <div>realative items</div>
           <div>production information</div>
           <div>{singleproduct.description}</div>
           <div>review</div>

        </div>
    ) 
}

export default SingleProduct;