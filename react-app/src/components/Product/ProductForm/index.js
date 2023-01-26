import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateProduct,fetchUpdateProduct, fetchDeleteProduct} from "../../../store/product";
import './ProductForm.css'

const ProductForm=({product,formType})=>{
    
    let initTitle,initCategory,initPrice,initDiscount,initInventory,initStyle,initBrand,initColor,initDimension,initAbout,initDescription,initImageUrl
    const history=useHistory()
    const dispatch = useDispatch();

    if(formType==="Edit Product"){
        initTitle=product.title;
        initCategory=product.category;
        initPrice=product.price;
        initDiscount=product.discount;
        initInventory=product.inventory;
        initStyle=product.style;
        initBrand=product.brand;
        initColor=product.color;
        initDimension=product.dimension;
        initAbout=product.about;
        initDescription=product.description;
        initImageUrl=product.imageUrl;
    }
    else{
        initTitle='';
        initCategory='';
        initPrice=0;
        initDiscount=0;
        initInventory=0;
        initStyle='';
        initBrand='';
        initColor='';
        initDimension='';
        initAbout='';
        initDescription='';
        initImageUrl='';
    }


    const [title, setTitle] = useState(initTitle);
    const [category, setCategory] = useState(initCategory);
    const [price, setPrice] = useState(initPrice);
    const [discount, setDiscount] = useState(initDiscount);
    const [inventory, setInventory] = useState(initInventory);
    const [style, setStyle] = useState(initStyle);
    const [brand, setBrand] = useState(initBrand);
    const [color, setColor] = useState(initColor);
    const [dimension, setDimension] = useState(initDimension);
    const [about, setAbout] = useState(initAbout);
    const [description, setDescription] = useState(initDescription);
    const [imageUrl, setImageUrl] = useState(initImageUrl);

    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
        if (!title&&!category&&!price&&!discount&&!inventory&&!style&&!brand&&!color&&!dimension&&!about&&!description&&!imageUrl) {
          setValidationErrors([]);
          return;
        }

        const errors =[];
        if(title.length<=0){errors.push("Product's title field is required");}
        else if(title.length>=255){errors.push("Project's title must be less than 255 characters")}
        if(category.length<=0){errors.push("Project's category field is required");}
        else if(category.length>=255){errors.push("Project's category must be less than 255 characters")}
        if(isNaN(price)){errors.push("Project's price must be a real number");}
        else if(price<=0){errors.push("Project's price must be greater than 0");}
        else if(!(/^\d+(\.\d{1,2})?$/.test(price))){errors.push("Project's price must be within 2 decimal places");}
        if(isNaN(discount)){errors.push("Project's discount must be a real number");}
        else if(discount<=0){errors.push("Project's discount must be greater than 0");}
        else if(!(/^\d+(\.\d{1,2})?$/.test(discount))){errors.push("Project's discount must be within 2 decimal places");}
        if(isNaN(inventory)){errors.push("Project's inventory must be a real number");}
        else if(inventory<=0){errors.push("Project's inventory must be greater than 0");}
        if(style.length<=0){errors.push("Product's style is required");}
        if(brand.length<=0){errors.push("Product's brand is required");}
        if(color.length<=0){errors.push("Product's color is required");}
        if(dimension.length<=0){errors.push("Product's dimension is required");}
        if(about.length<=0){errors.push("Product's introduction is required");}
        if(description.length<=0){errors.push("Project's description field is required");}
        else if(description.length>=4000){errors.push("Project's description must be less than 4000 characters")}
        if(imageUrl.length<=0){errors.push("Project's image link field is required");}
        else if (!imageUrl.includes("http")){errors.push("Project's image link must be a valid website link");}        


        setValidationErrors(errors);

      }, [title,category,price,discount,inventory,style,brand,color,dimension,about,description,imageUrl]);    


const handleSubmit = async (e)=>{
        e.preventDefault();
        const tempProduct = { ...product, title, category,price,discount,inventory,style,brand,color,dimension,about,description,imageUrl};
        const errors=[]

        if(formType==="Create Product"){
               dispatch(fetchCreateProduct(tempProduct))
               .then(()=>{history.push(`/sellercentral`)})
               .catch(async (err)=>{
                const errobj=await err.json();
                errors.push(errobj.message)
                setValidationErrors(errors)
            });
            }
        else if(formType==="Edit Product"){
                dispatch(fetchUpdateProduct(tempProduct))
                .then(()=>history.push(`/sellercentral`))
                .catch(async (err)=>{
                  const errobj=await err.json();
                  errors.push(errobj.message)
                  setValidationErrors(errors)

                });
            }
    } 

    const deleteEvents= (id)=>{
        const errors=[]
        dispatch(fetchDeleteProduct(id))
        .then(()=>history.push('/sellercentral'))
        .catch(async (err)=>{
          const errobj=await err.json();
          errors.push(errobj.message)
          setValidationErrors(errors)
        });
        }


    return(
        <div className='productform-section'>
          <div className='productform-title'><h2>{formType}</h2>
          <form className='productform-form' onSubmit={handleSubmit}>
            
          <div className='productform-listitem'>
          <label>
          Choose your product's title
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's category
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's price
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's discount
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="discount"
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's inventory
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="inventory"
          onChange={(e) => setInventory(e.target.value)}
          value={inventory}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's style
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="style"
          onChange={(e) => setStyle(e.target.value)}
          value={style}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's brand
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="brand"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's color
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="color"
          onChange={(e) => setColor(e.target.value)}
          value={color}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's dimension
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="dimension"
          onChange={(e) => setDimension(e.target.value)}
          value={dimension}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's introduction
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="about"
          onChange={(e) => setAbout(e.target.value)}
          value={about}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's description
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's image url
          </label>
          <input
          className='input'
          placeholder='Please add your favorite name less than 50 characters'
          type="text"
          name="imageUrl"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}/></div>
          <input type="submit" value={formType} className="spotbutton" disabled={!!validationErrors.length}/>
         </form>

         {formType==="Edit Product" &&(
              <div className="projectform-button">
              <button onClick={()=>deleteEvents(product.id)} className="projectform-delebutton">Delete project</button>
              </div>
         )}

         <div className='spotform-errorsec'>
         <div className='error-title'>
         <i className="fa-solid fa-circle-exclamation ertlbu" />
         <h4>Validation Checking List</h4>
         </div>
          {!!validationErrors.length && (
          <div className='spotform-errortable'>
          <div className='spotform-error'>
          {validationErrors.map((error) => (
          <div key={error} className="spotform-errortext">{error}</div>
                       ))}
          </div>
          </div>
          )}
          </div>

         </div>
        </div>
    )
}

export default ProductForm;
