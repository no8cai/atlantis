import React,{ useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAllProducts } from '../../../store/product';
import { NavLink } from 'react-router-dom';
import "./Homepage.css";
import ImageSlider from './ImageSlider';
import { useState } from 'react';


function Homepage() {

    const dispatch = useDispatch();
    const productsObj = useSelector(state => state.products)
    const allproducts=Object.values(productsObj)

    const [ randId1, setRandId1 ] = useState(Math.floor(Math.random() * (allproducts.length) + 1))
    const [ randId2, setRandId2 ] = useState(Math.floor(Math.random() * (allproducts.length) + 1))

    // const randProduct1 = allproducts[randId1]
    // const randProduct2 = allproducts[randId2]
    const randProduct1 = allproducts[randId1]
    const randProduct2 = allproducts[randId2]

    const history=useHistory();

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);


const slides =[
  {url:'https://m.media-amazon.com/images/I/61rKNNX+o+L._SX3000_.jpg',title:'Beach'},
  {url:'https://m.media-amazon.com/images/I/71DjHmMj+jL._SX3000_.jpg',title:'Boat'},
  {url:'https://m.media-amazon.com/images/I/71qKCoGx16L._SX3000_.jpg',title:'Flyer'},
]

const containerSytles = {
    width:'100vw',
    height:'700px',
    margin:"0 0",
};


    

    if(!productsObj) return null
    // if(!productsObj || !allproducts || !randProduct1 || !randProduct2) return null


    return (
        <div className='homepage-section'>
            <div className='homepage-firstsec'>
                <div style={containerSytles}>
                <ImageSlider slides={slides} allproducts={allproducts}/>
                </div>
            </div>

            <div className='homepage-secondsec'>
               <div className='sc-entire'>
               <div className='sc-first'>
               <a href='https://firestarter.onrender.com/' className="footer-links-labels" title='explore our group project'>
               <img 
               src={'https://media.tenor.com/UIJ9DZX6AR4AAAAd/atlantis.gif'} className="image"
               onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
               /></a>
               </div>
               <div className="sc-second">
               <div className="sc-sectiontitle">Explore more items</div>
               <NavLink to={`/products/${randProduct1?randProduct1.id:1}`} className='is-link'>
                  <div className="top-thirditem">
                  <img src={randProduct1?randProduct1.imageUrl:"https://m.media-amazon.com/images/I/71yI7N2eijL._AC_SX679_.jpg"}
                  onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                  />
                  </div>
                   <div>
                   <div>{randProduct1?`${randProduct1.title.slice(0,47)}...`:"Dell S2421H 24-Inch 1080p Full HD 1920 x 1080 Resolution..."}</div>
                   </div>
                </NavLink>
               </div>

               <div className='sc-second'>
               <div className="sc-sectiontitle">Shopping with fun</div>
               <NavLink to={`/products/${randProduct2?randProduct2.id:1}`} className='is-link'>
                  <div className="top-thirditem">
                  <img src={randProduct2?randProduct2.imageUrl:"https://m.media-amazon.com/images/I/71yI7N2eijL._AC_SX679_.jpg"}
                  onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                  />
                  </div>
                   <div>
                   <div>{randProduct2?`${randProduct2.title.slice(0,47)}...`:"Dell S2421H 24-Inch 1080p Full HD 1920 x 1080 Resolution..."}</div>
                   </div>
                </NavLink>
               </div>
               </div>
            </div>
        </div>
    )
}

export default Homepage;