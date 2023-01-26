import React from "react";
import ProductForm from "../ProductForm";

const CreatProduct=()=>{

    const product={
        creatorId:"",
        title:"",
        category:"",
        price:0,
        discount:"",
        inventory:"",
        style:"",
        brand:"",
        color:"",
        dimension:"",
        about:"",
        description:"",
        imageUrl:"",
    }

    return (
        <ProductForm product={product} formType="Create Product"/>
        // <h1>weclome</h1>
    )
}

export default CreatProduct;
