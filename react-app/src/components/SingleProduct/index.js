import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom';
import { fetchAllProducts } from '../../store/product';
import { fetchCreateCartItem } from '../../store/cartitem';
import "./SingleProduct.css"

function SingleProduct() {
    
    const history=useHistory()
    const { productId } = useParams();
    const dispatch = useDispatch();
    const singleproduct = useSelector(state => state.products[productId])
    const sessionUser = useSelector(state => state.session.user);
    const [quantity, setQuantity] = useState(1);
    const [validationErrors, setValidationErrors] = useState([]);




    // console.log(singleproduct)

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);
    



    const arrGenerator=(num)=>{
        let inputnum = 0
        if (parseInt(num)<=10){
            inputnum=parseInt(num)+1
        }else{
            inputnum=11
        }
        let arry=[...Array(inputnum).keys()]
        arry.shift()
        return arry
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const tempcartitem = {
            quantity:quantity
        }
        // console.log(tempcartitem)
        let errors=[]

        dispatch(fetchCreateCartItem(tempcartitem,productId))
        .then(()=>{history.push(`/cartitems`)})
        .catch(async (err)=>{
         const errobj=await err.json();
         errors.push([...errobj.errors])
         setValidationErrors(errors)
          });

    } 

    const loginEvents=()=>{
        history.push('/login')
      }

    if(!singleproduct) return (<div className='sp-broken'>This page was not able to load</div>)

    return (
        <div className='singleproject-entire'>
           <div className='singleproject-topsec'>
             <div className='singleproject-imagesec'><img src={singleproduct.imageUrl} className="singleproduct-image"
             onError={e => { e.currentTarget.src = "https://www.shutterstock.com/image-vector/coming-soon-under-construction-yellow-600w-1746344219.jpg"; }}
             /></div>
             <div className='singleproject-topmid'>
                <div>
                <div className='singleproduct-title'>{singleproduct.title}</div>
                <div className='singleproduct-decocontext'>Visite the Store</div>
                <div className='singleproduct-primedeco'><div>Atlantis's</div><div className='singleproduct-choice'>Choice</div></div>
                </div>

                <div className='singleproduct-midsecond'>
                <div className='singleproduct-pricesec'>
                <div className='singleproduct-discount'>{`-${parseFloat((1-singleproduct.discount)*100).toFixed(0)}%`}</div>
                <div className='singleproduct-price'>
                    <div className='singleproduct-dollorsign'>$</div>
                    <div className='singleproduct-pricecontext'>{`${(singleproduct.price*singleproduct.discount).toFixed(2)}`}</div>
                </div>
                </div>

                <div className='singleprodcut-listprice'>{`List price: $${singleproduct.price}`}</div>
                <div className='singleproduct-primeday'>
                    <div className='Prime'>Prime</div> 
                    <div>One-Day</div>
                </div>
                <div className='singleproduct-decocontext'>FREE Returns</div>
                <div>May be available at a lower price from other sellers, potentially without free Prime shipping.</div>
                </div>

                <div className='singleproduct-midthird'>
                <div className='singleproduct-basicinfo'>
                    <div className='singleproduct-infotitle'>Style</div>
                    <div>{singleproduct.style}</div>
                </div>
                <div className='singleproduct-basicinfo'>
                    <div className='singleproduct-infotitle'>Color</div>
                    <div>{singleproduct.color}</div>
                </div>
                <div className='singleproduct-basicinfo'>
                    <div className='singleproduct-infotitle'>Dimension</div>
                    <div>{singleproduct.dimension}</div>
                </div>
                </div>


                <div className='singleproduct-midthird'>
                    <div className='singleproduct-about'>About this item</div>
                    <div>{singleproduct.about}</div>
                </div>
             </div>
    
             <div className='singleproduct-rightsec'>
                <div className='singleproduct-about'>
                     Buy new:
                </div>

                <div className='singleproduct-price'>
                    <div className='singleproduct-dollorsign'>$</div>
                    <div className='singleproduct-pricecontext'>{`${(singleproduct.price*singleproduct.discount).toFixed(2)}`}</div>
                </div>

                <div className='singleproduct-primeday'>
                    <div className='Prime'>Prime</div> 
                    <div>One-Day</div>
                </div>

                <div className='singleproduct-decocontext'>FREE Returns</div>
                <div>FREE delivery within 1 day</div>
                <div className='singleproduct-stock'>In Stock</div>
                 <div>
                    <form className='singleproduct-productform' onSubmit={handleSubmit}>
                    <div className='singleproduct-selectsec'>
                        <select
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        >
                                {arrGenerator(singleproduct.inventory).map(number => (
                                  <option key={number} value={number} className={'singleproduct-option'}> {`Qty ${number}`}</option>
                               ))}
                        </select>
                    </div>
                {!!sessionUser &&(
                  <input type="submit" value='Add to Cart'/>
                     )}
                    
                   </form>
                {!sessionUser &&(
                  <div className='singleproduct-signinsec' onClick={()=>loginEvents()} ><div className='singleproduct-signin'>Sign in to Buy</div></div>
                     )}
                 <div className='singleproduct-decocontext'>Secure transaction</div>
                 </div>
                 <div>
                      {!!validationErrors.length && (
                      <div className='projectform-errortable'>
                      <div className='projectform-error'>
                       {validationErrors.map((error) => (
                         <div key={error} className='signin-errors'><i className="fa-solid fa-circle-exclamation"/>{error}</div>
                       ))}
                      </div>
                      </div>
                      )}
                 </div>
                 <div>
                    Return policy: Eligible for Return, Refund or Replacement within 30 days of receipt
                 </div>
             </div>
           </div>

           <div>
           <div className='singleproduct-about'>Production information</div>
           <div>{singleproduct.description}</div>
           </div>

        </div>
    ) 
}

export default SingleProduct;