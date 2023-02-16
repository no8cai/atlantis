import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewForm from "../ReviewForm";
import { useEffect } from "react";
import { fetchAllReviews } from "../../../store/review";
import { fetchAllProducts } from "../../../store/product";
import { useDispatch } from "react-redux";

const EditReview=()=>{

    const {reviewId}=useParams();
    const dispatch = useDispatch();
    const tempreview = useSelector(state=>state.reviews[reviewId])
    const productsObj = useSelector(state =>state.products)



    useEffect(() => {
        dispatch(fetchAllReviews());
        dispatch(fetchAllProducts());
    }, [dispatch]);

    if((!tempreview)||(!productsObj)) return null

    const theReview={
        id:tempreview.id,
        comments:tempreview.comments,
        stars:tempreview.stars,
      }
    const theProduct=productsObj[tempreview.productId]

    return(
        <ReviewForm theReview={theReview} formType='Edit Review' theProduct={theProduct}/>
    )

}

export default EditReview;