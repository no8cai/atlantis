import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllProducts } from '../../../store/product';
import { NavLink } from 'react-router-dom';
import "./Homepage.css"

function Homepage() {

    const dispatch = useDispatch();
    const productsObj = useSelector(state => state.products)
    const allproducts=Object.values(productsObj)
    const history=useHistory();

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    if(!productsObj) return null


    return (
        <div>
            <div className='homepage-list'>
            {allproducts.map(({ id, title,category,price,dicount,brand,imageUrl}) => (
            <div className='item' key={id}><NavLink to={`/products/${id}`}>
                <div className='itemimg'><img src={imageUrl} className="image"/></div>
                <div>{title}</div>
            </NavLink></div>
          ))}               
            </div>
        </div>
    )
}

export default Homepage;