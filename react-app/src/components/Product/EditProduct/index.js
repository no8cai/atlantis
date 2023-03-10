import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../ProductForm";
import { useSelector } from "react-redux";
import { fetchAllProducts } from "../../../store/product";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const EditProduct=()=>{

    const {productId}=useParams();

    const tempproduct = useSelector(state=>state.products[productId])
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);



    if(!tempproduct) return null

    const product={
        id:tempproduct.id,
        creatorId:tempproduct.creatorId,
        title:tempproduct.title,
        category:tempproduct.category,
        price:tempproduct.price,
        discount:tempproduct.discount,
        inventory:tempproduct.inventory,
        style:tempproduct.style,
        brand:tempproduct.brand,
        color:tempproduct.color,
        dimension:tempproduct.dimension.split(" ")[0],
        about:tempproduct.about,
        description:tempproduct.description,
        imageUrl:tempproduct.imageUrl,
    }

    return (
        <ProductForm product={product} formType="Edit Product"/>
    )
}

export default EditProduct;
