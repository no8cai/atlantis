import { useState } from "react"
import "./Homepage.css";


const ImageSlider=({slides})=>{

    const [currentIndex, setCurrentIndex]=useState(0)

    const sliderStyles = {
        height:'100%',
        position:'relative',
    }

    const slidesStyles={
        width:'100%',
        height:'100%',
        // borderRadius:'10px',
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

    return (
       <div style={sliderStyles}>
        <div style={leftArrowStyles} onClick={goToPrevious} className='imageslider-arrowleft'><i className="fa-solid fa-chevron-left"/></div>
        <div style={rightArrowStyles} onClick={goToNext} className='imageslider-arrowright'><i className="fa-solid fa-chevron-right"/></div>
         <div style={slidesStyles}></div>
       </div>
    )
    
}
export default ImageSlider