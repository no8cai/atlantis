import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../ReviewForm";
import { useEffect } from "react";
import { fetchAllProducts } from "../../../store/product";
import { useDispatch,useSelector } from "react-redux";


const CreateReview=()=>{

    const {productId}=useParams();


    const dispatch = useDispatch();
    const productsObj = useSelector(state =>state.products)


    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);


    if(!productsObj) return null

    const theReview ={
        comments:'',
        stars:0,
    }

    const theProduct=productsObj[productId]

    return(
        <ReviewForm theReview={theReview} formType='Create Review' theProduct={theProduct}/>
    )

}

export default CreateReview;