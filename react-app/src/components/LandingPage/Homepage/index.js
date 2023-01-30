import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllProducts } from '../../../store/product';
import { NavLink } from 'react-router-dom';
import "./Homepage.css";
import ImageSlider from './ImageSlider';


function Homepage() {

    const dispatch = useDispatch();
    const productsObj = useSelector(state => state.products)
    const allproducts=Object.values(productsObj)
    const history=useHistory();

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);


const slides =[
  {url:'https://m.media-amazon.com/images/I/61rKNNX+o+L._SX3000_.jpg',title:'Beach'},
  {url:'https://m.media-amazon.com/images/I/71DjHmMj+jL._SX3000_.jpg',title:'Boat'},
  {url:'https://m.media-amazon.com/images/I/71qKCoGx16L._SX3000_.jpg',title:'Flyer'}
]

const containerSytles = {
    width:'100vw',
    height:'700px',
    margin:"0 auto",

};


    if(!productsObj) return null


    return (
        <div className='homepage-section'>
            <div className='homepage-firstsec'>
                <div style={containerSytles}>
                <ImageSlider slides={slides}/>
                </div>
            </div>
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