import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchAllProducts } from "../../../store/product";
import { NavLink } from "react-router-dom";
import Error404page from "../../Error/Error404";
import "./Filterpage.css"

const FilterSearchPage=()=>{

    const dispatch = useDispatch();
    const {filterItem}=useParams()
    const productsObj = useSelector(state => state.products)
    const filteredproducts=Object.values(productsObj).filter(el=>el.category==filterItem)

    useEffect(() => {
        dispatch(fetchAllProducts());
      }, [dispatch]);

    let imagelist={
        'Clothing,Shones':'https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/SITE_FLIPS/WIN23/BROWSE/L1M/DT/L1M_DT_VTO._CB1198675309_.jpg',
        'Books':'https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2023/img/Books/XCM_Manual_1534551_2866151_5311197_1500x300_en_US.jpg',
        'Movies,Music&Games':'https://m.media-amazon.com/images/S/sonata-images-prod/US_TVOD_MultiPMD_021023_V1_SH/e3135562-7c9c-469b-b2a9-7cad3f934788._UR3000,600_SX1500_FMwebp_.jpeg',
        'Electronics':'https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2022/img/Consumer_Electronics/XCM_Manual_1462004_2540535_4936990_3000x600_en_US.jpg',
        'Computers':'https://images-na.ssl-images-amazon.com/images/G/01/consumerelectronics/CAC/Category_Storefronts/1367476_us_he_handpicked_monitors1500x440.jpg',
        'Home,Garden&Tools':'https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2022/Q3/Onsite/StoreFronts/2022Q3_HCT_Storefront_Ingress_IdeasTrends_D_1500x300_EN.jpg',
        'Toys,Kids&Baby':'https://images-na.ssl-images-amazon.com/images/G/01/mpatrona/February_2023_Play-Doh_Valentine_Storefront_Banner_Template_Desktop_-_ENGLISH.jpg',
        'Sports':'https://images-na.ssl-images-amazon.com/images/G/01/sports/marinpow/ASO-Header-Apparel.jpg',
        'Beauty&Health':'https://images-na.ssl-images-amazon.com/images/G/01/consumables/nicoherm/MonthlyEndcap/AMZ_FEB23_Beauty-CategoryBanner-D-1500x300-EN.jpg',
    }
    
    
    
    if(!productsObj) return null
    // else if(!filteredproducts.length) return (<div className='sp-broken'><Error404page/></div>)
    
    return (
        <div className="ftr-entiresec">
         <div className="ftr-title">{filterItem}</div>
         <div>
         <img 
                src={imagelist[filterItem]} className="ftr-banner"
                onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                />
         </div>
        <div className="ftr-itemsec">
        {filteredproducts.map(({ id, title,category,price,discount,brand,imageUrl,color}) => (
        <div className='fp-itemsec' key={id}>
            <div className='fp-boxitem'>
            <NavLink to={`/products/${id}`} className="fp-links">
            <div className="fp-imageitem">
            <img 
                src={imageUrl} className="ftr-image"
                onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
                />
            </div>

            <div className="fp-item fp-price">{`$${(price*discount).toFixed(2)}`}</div>
            <div className="fp-item fp-listprice">${price}</div>
            <div className="Prime fp-prime">Prime</div>
            <div className="fp-item">{`${title.slice(0,40)}...`}</div>
            <div className="fp-item fp-category">{category}</div>
            </NavLink>
            </div>
        </div>
      ))}               

        </div>
        </div>
    )
}

export default FilterSearchPage