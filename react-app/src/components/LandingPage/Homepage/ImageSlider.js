import { useState } from "react"
import { NavLink } from "react-router-dom";
import "./Homepage.css";


const ImageSlider=({slides,allproducts})=>{

    const [currentIndex, setCurrentIndex]=useState(0)
    const [ randId, setRandId ] = useState(Math.floor(Math.random() * (allproducts.length) + 1))

    let topdeal=allproducts[0]
    
    allproducts.forEach(el=>{
       if(el.discount<topdeal.discount){
            topdeal=el
       }
    })


    const randProduct = allproducts[randId]

    const sliderStyles = {
        height:'100%',
        position:'relative',
    }

    const slidesStyles={
        width:'100%',
        height:'100%',
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundImage:`url(${slides[currentIndex].url})`,
        transition:'ease-in-out 0.5s',
    }

    const leftArrowStyles={
        position:'absolute',
        top:'30%',
        transform:'translate(0,-50%)',
        left:'32px',
        fontSize:'45px',
        color:'#fff',
        zIndex:1,
        cursor:'pointer',
    }

    const rightArrowStyles={
        position:'absolute',
        top:'30%',
        transform:'translate(0,-50%)',
        right:'32px',
        fontSize:'45px',
        color:'#fff',
        zIndex:1,
        cursor:'pointer',
    }
    const goToPrevious=()=>{
        const isFristSlide=currentIndex===0
        const newIndex=isFristSlide?slides.length-1:currentIndex-1;
        setCurrentIndex(newIndex)
    }

    const goToNext=()=>{
        const isLastSlide=currentIndex===slides.length-1;
        const newIndex=isLastSlide?0:currentIndex+1
        setCurrentIndex(newIndex)
    }



    // if(!topdeal || !randProduct) return null

    return (
       <div style={sliderStyles}>
        <div style={leftArrowStyles} onClick={goToPrevious} className='imageslider-arrowleft'><i className="fa-solid fa-chevron-left"/></div>
        <div style={rightArrowStyles} onClick={goToNext} className='imageslider-arrowright'><i className="fa-solid fa-chevron-right"/></div>
        <div className="top-section">
        <div className="top-first">
            <div className="top-sectiontitle">Items you may like</div> 
            <div className='firstsec-left'>
            {allproducts.slice(0,4).map(({ id, title,imageUrl}) => (
            <div className='is-item' key={id}><NavLink to={`/products/${id}`} className='is-link'>
                <div className='is-itemimg'><img 
                src={imageUrl} className="image"
                onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                /></div>
                <div>{`${(title).slice(0,11)}...`}</div>
            </NavLink></div>
            
          ))}
            </div>       
        </div>
        <div className="top-first">
            <div className="top-sectiontitle">New items</div>
            <div className='firstsec-left'>
           {allproducts.slice(0).reverse().slice(0,4).map(({ id, title,imageUrl}) => (
            <div className='is-item' key={id}><NavLink to={`/products/${id}`} className='is-link'>
                <div className='is-itemimg'><img 
                src={imageUrl} className="image"
                onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                /></div>
                <div>{`${(title).slice(0,11)}...`}</div>
            </NavLink></div>
            
            ))}
            </div>
        </div>
        <div className="top-first">
        <div className="top-sectiontitle">Best deal of the Day</div>
        <NavLink to={`/products/${topdeal?topdeal.id:1}`} className='is-link'>
        <div className="top-thirditem">
           <img src={topdeal?topdeal.imageUrl:"https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"}
           onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
           />
        </div>
        
        <div className="top-discount">{topdeal?`Up to ${((1-topdeal.discount)*100).toFixed(2)}% off`:""}</div>
        <div>{topdeal?`${topdeal.title.slice(0,47)}...`:""}</div>
        </NavLink>
        </div>

        <div className="top-first">
        <div className="top-sectiontitle">Reach your goal with us</div>
        <NavLink to={`/products/${randProduct?randProduct.id:1}`} className='is-link'>
            <div className="top-thirditem">
            <img src={randProduct?randProduct.imageUrl:"https://m.media-amazon.com/images/I/71yI7N2eijL._AC_SX679_.jpg"}
            // onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
            />
            </div>
            <div>
            <div>{randProduct?`${randProduct.title.slice(0,47)}...`:"Dell S2421H 24-Inch 1080p Full HD 1920 x 1080 Resolution..."}</div>
            </div>
        </NavLink>
        </div>
        </div>
         <div style={slidesStyles}></div>
       </div>
    )
    
}
export default ImageSlider