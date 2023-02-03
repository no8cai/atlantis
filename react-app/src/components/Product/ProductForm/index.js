import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateProduct,fetchUpdateProduct, fetchDeleteProduct} from "../../../store/product";
import './ProductForm.css'
import { removeCartItembyProductId } from "../../../store/cartitem";

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
        initCategory='Clothing,Shones';
        initPrice=0;
        initDiscount=0;
        initInventory=0;
        initStyle='Traditional';
        initBrand='';
        initColor='';
        initDimension='';
        initAbout='';
        initDescription='';
        initImageUrl='';
    }

    const allCategories = [ 'Clothing,Shones', 'Books',  'Movies,Music&Games',  'Electronics',  'Computers',  'Home,Garden&Tools','Toys,Kids&Baby','Sports','Beauty&Health']
    const allStyles=['Traditional', 'Modern','Classic','Combination','Future']


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
        else if(title.length>=255){errors.push("Product's title must be less than 255 characters")}
        if(category.length<=0){errors.push("Product's category field is required");}
        else if(category.length>=255){errors.push("Product's category must be less than 255 characters")}
        if(price.length<=0){errors.push("Product's price field is required");}
        else if(isNaN(price)){errors.push("Product's price must be a real number");}
        else if(price<=0){errors.push("Product's price must be greater than 0");}
        else if(!(/^\d+(\.\d{1,2})?$/.test(price))){errors.push("Product's price must be within 2 decimal places");}
        else if(price.length>=50){errors.push("Product's price must be less than 50 digits in total")}
        if(discount.length<=0){errors.push("Product's discount field is required");}
        else if(isNaN(discount)){errors.push("Product's discount must be a real number");}
        else if(discount<=0){errors.push("Product's discount must be greater than 0");}
        else if(!(/^\d+(\.\d{1,2})?$/.test(discount))){errors.push("Product's discount must be within 2 decimal places");}
        else if(discount>=1){errors.push("Product's discount must be less than 100% so the discount should be between 0 and 1");}
        if(inventory.length<=0){errors.push("Product's inventory field is required");}
        else if(isNaN(inventory)){errors.push("Product's inventory must be a real number");}
        else if(inventory<=0){errors.push("Product's inventory must be greater than 0");}
        if(style.length<=0){errors.push("Product's style is required");}
        else if(style.length>=50){errors.push("Product's style must be less than 50 characters")}
        if(brand.length<=0){errors.push("Product's brand is required");}
        else if(brand.length>=50){errors.push("Product's brand must be less than 50 characters")}
        if(color.length<=0){errors.push("Product's color is required");}
        else if(color.length>=50){errors.push("Product's color must be less than 50 characters")}
        if(dimension.length<=0){errors.push("Product's dimension is required");}
        else if(dimension.length>=50){errors.push("Product's dimension must be less than 50 characters")}
        if(about.length<=0){errors.push("Product's introduction is required");}
        else if(about.length>=2000){errors.push("Product's introduction must be less than 2000 characters")}
        if(description.length<=0){errors.push("Product's description field is required");}
        else if(description.length>=4000){errors.push("Product's description must be less than 4000 characters")}
        if(imageUrl.length<=0){errors.push("Product's image link field is required");}
        else if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")){errors.push("Product's image link must be a valid website link with http:// or https://");}        
        else if (!imageUrl.endsWith("jpg") && !imageUrl.endsWith("gif") && !imageUrl.endsWith("png") && !imageUrl.endsWith("JPG") && !imageUrl.endsWith("GIF") && !imageUrl.endsWith("PNG")){errors.push("Product's image link must have a valid type of jpg, png or gif");}
        else if(imageUrl.length>=1000){errors.push("Product's image url must be less than 1000 characters")}

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
        .then(dispatch(removeCartItembyProductId(id)))
        .then(()=>history.push('/sellercentral'))
        .catch(async (err)=>{
          const errobj=await err.json();
          errors.push(errobj.message)
          setValidationErrors(errors)
        });
        }


    return(
        <div className='productform-section'>
          <div className='productform-totalsec'><div className="productform-title">{formType}</div>
          <form className='productform-form' onSubmit={handleSubmit}>
            
          <div className='productform-listitem'>
          <label>
          Product's title
          </label>
          <input
          className='input'
          placeholder="Please input your product's title"
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's category 
          </label>
                       <select
                        placeholder='Category'
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        >
                            {allCategories.map(category => (
                                <option key={category} value={category}> {category}</option>
                            ))}
                        </select>
          
          </div>

          <div className='productform-listitem'>
          <label>
          Product's listing price
          </label>
          <input
          className='input'
          placeholder='Please indicate the price of the product'
          type="text"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}/></div>

          <div className='productform-listitem'>
          <label>
          Decide your product's discount
          : Final price=List price x discount
          </label>
          <input
          className='input'
          placeholder='Please indicate the discount of the product'
          type="text"
          name="discount"
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}/></div>

          <div className='productform-listitem'>
          <label>
          Decide your product's inventory
          </label>
          <input
          className='input'
          placeholder='Please indicate the inventory of the product'
          type="text"
          name="inventory"
          onChange={(e) => setInventory(e.target.value)}
          value={inventory}/></div>

          <div className='productform-listitem'>
          <label>
          Choose your product's style
          </label>


                       <select
                        placeholder='Please choose the style of you product'
                        onChange={(e) => setStyle(e.target.value)}
                        value={style}
                        >
                            {allStyles.map(style => (
                                <option key={style} value={style}> {style}</option>
                            ))}
                        </select>      
          </div>

          <div className='productform-listitem'>
          <label>
          Product's brand
          </label>
          <input
          className='input'
          placeholder='Please indicate the brand of the product'
          type="text"
          name="brand"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}/></div>

          <div className='productform-listitem'>
          <label>
           Product's color
          </label>
          <input
          className='input'
          placeholder='Please indicate the color of the product'
          type="text"
          name="color"
          onChange={(e) => setColor(e.target.value)}
          value={color}/></div>

          <div className='productform-listitem'>
          <label>
          Product's dimension
          </label>
          <input
          className='input'
          placeholder='Please add the dimension of the product'
          type="text"
          name="dimension"
          onChange={(e) => setDimension(e.target.value)}
          value={dimension}/></div>

          <div className='productform-listitem'>
          <label>
          Product's introduction
          </label>
          <textarea
          className='input'
          placeholder='Please add the product introduction'
          type="text"
          name="about"
          onChange={(e) => setAbout(e.target.value)}
          value={about}/></div>

          <div className='productform-listitem'>
          <label>
          Product's description
          </label>
          <textarea
          className='input'
          placeholder='Please add the pruduct description'
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}/></div>

          <div className='productform-listitem'>
          <label>
          Product's image url
          </label>
          <input
          className='input'
          placeholder='Please add one product image url link'
          type="text"
          name="imageUrl"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}/></div>
          <div className="productform-buttomsec">
          <input type="submit" value={formType} className="spotbutton" disabled={!!validationErrors.length}/>
          </div>
         </form>

         {formType==="Edit Product" &&(
              <div className="Productform-button">
              <button onClick={()=>deleteEvents(product.id)} className="Productform-delebutton">Delete Product</button>
              </div>
         )}

         <div className='productform-errorsec'>
         <div className='error-title'>
         <i className="fa-solid fa-circle-exclamation ertlbu" />
         <h4>Validation Checking List</h4>
         </div>
          {!!validationErrors.length && (
          <div className='productform-errortable'>
          <div className='productform-error'>
          {validationErrors.map((error) => (
          <div key={error} className="productform-errortext">{error}</div>
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
