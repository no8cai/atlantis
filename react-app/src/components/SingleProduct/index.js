import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom';
import { fetchAllProducts } from '../../store/product';
import { fetchCreateCartItem } from '../../store/cartitem';
import { fetchAllReviews } from '../../store/review';
import Error404page from '../Error/Error404';
import "./SingleProduct.css"

function SingleProduct() {
    
    const history=useHistory()
    const { productId } = useParams();
    const dispatch = useDispatch();
    const singleproduct = useSelector(state => state.products[productId])
    const sessionUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state=>state.reviews)
    const reviews=Object.values(reviewsObj).filter(el=>el.productId==productId)



    const [quantity, setQuantity] = useState(1);
    const [validationErrors, setValidationErrors] = useState([]);




    // console.log(singleproduct)

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(fetchAllReviews());
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



    if((!singleproduct)||(!reviewsObj)) return (<div className='sp-broken'><Error404page/></div>)

    let totalstars=0
    let starrateobj={1:0,2:0,3:0,4:0,5:0}
    
    reviews.forEach((el)=>{
        if(el==null){
            totalstars=0 
          }
        
         totalstars+=el.stars
         if(el.stars==1){
            starrateobj[1]+=1
         }else if(el.stars==2){
            starrateobj[2]+=1
         }else if(el.stars==3){
            starrateobj[3]+=1
         }else if(el.stars==4){
            starrateobj[4]+=1
         }else if(el.stars==5){
            starrateobj[5]+=1
         }
    })

    const rateround=(num)=>{
        if(num.toString=="NaN"){
            return 0
        }
        let temp=parseInt(num/0.5)
        return temp*0.5
    }

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

                <div>
                {(reviews.length>0)&&(
                 <div className='ratesec'>
                  <div class="rating-content" data-rating={rateround(totalstars/reviews.length)}>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  </div>   
                 <div className='singleproduct-decocontext'>{`${reviews.length} ${reviews.length==1?"rating":"ratings"}`}</div>
                 </div>
                )}
                </div>

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
                    <div className='singleproduct-subcolor'>{singleproduct.color}</div>
                </div>
                <div className='singleproduct-basicinfo'>
                    <div className='singleproduct-infotitle'>Dimension</div>
                    <div>{singleproduct.dimension}</div>
                </div>
                </div>


                <div className='singleproduct-midthird'>
                    <div className='singleproduct-about'>About this item</div>
                    <div className='singleproduct-aboutcontext'>{singleproduct.about}</div>
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
           <div className='singleproduct-aboutcontext desplus'>{singleproduct.description}</div>
           </div>

           <div className="sp-rev">
            <div className='sp-rateleftsec'>
             <div className='sp-rvtitle'>Customer reviews</div>
             <div className='ratesec'>
                  <div class="rating-content" data-rating={rateround(totalstars?totalstars/reviews.length:0)}>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  </div>   
                  <div className='sp-about'>{`${totalstars?totalstars/reviews.length.toFixed(1):0} out of 5`}</div>
            </div>
            <div className='sp-decotext'>{`${reviews.length} global ${reviews.length==1?"rating":"ratings"}`}</div>

            <div className='sp-ratingmap'>
                <div className='sp-rateitem'>
                   <div class="side">
                   <div className='singleproduct-decocontext'>5 star</div>
                   </div>
                   <div class="middle">
                   <div class="bar-container">
                   <div class="bar-5" style={{width:`${(starrateobj[5]?starrateobj[5]/reviews.length:0).toFixed(2)*100}%`}}></div>
                   </div>
                   </div>
                   <div class="side right">
                   <div className='singleproduct-decocontext'>{`${(starrateobj[5]?starrateobj[5]/reviews.length:0).toFixed(2)*100}%`}</div>
                   </div>
                </div>

                 <div className='sp-rateitem'>
                    <div class="side">
                    <div className='singleproduct-decocontext'>4 star</div>
                    </div>
                    <div class="middle">
                    <div class="bar-container">
                    <div class="bar-4" style={{width:`${(starrateobj[4]?starrateobj[4]/reviews.length:0).toFixed(2)*100}%`}}></div>
                   </div>
                   </div>
                   <div class="side right">
                   <div className='singleproduct-decocontext'>{`${(starrateobj[4]?starrateobj[4]/reviews.length:0).toFixed(2)*100}%`}</div>
                   </div>
                </div>

                <div className='sp-rateitem'>
                    <div class="side">
                    <div className='singleproduct-decocontext'>3 star</div>
                    </div>
                    <div class="middle">
                    <div class="bar-container">
                    <div class="bar-3" style={{width:`${(starrateobj[3]?starrateobj[3]/reviews.length:0).toFixed(2)*100}%`}}></div>
                    </div>
                    </div>
                    <div class="side right">
                    <div className='singleproduct-decocontext'>{`${(starrateobj[3]?starrateobj[3]/reviews.length:0).toFixed(2)*100}%`}</div>
                    </div>
                </div>

                <div className='sp-rateitem'>
                    <div class="side">
                    <div className='singleproduct-decocontext' >2 star</div>
                    </div>
                    <div class="middle">
                    <div class="bar-container">
                    <div class="bar-2" style={{width:`${(starrateobj[2]?starrateobj[2]/reviews.length:0).toFixed(2)*100}%`}}></div>
                    </div>
                    </div>
                    <div class="side right">
                    <div className='singleproduct-decocontext'>{`${(starrateobj[2]?starrateobj[2]/reviews.length:0).toFixed(2)*100}%`}</div>
                    </div>
                </div>

                <div className='sp-rateitem'>
                    <div class="side">
                    <div className='singleproduct-decocontext'>1 star</div>
                    </div>
                    <div class="middle">
                    <div class="bar-container">
                    <div class="bar-1" style={{width:`${(starrateobj[1]?starrateobj[1]/reviews.length:0).toFixed(2)*100}%`}}></div>
                    </div>
                    </div>
                    <div class="side right">
                    <div className='singleproduct-decocontext'>{`${(starrateobj[1]?starrateobj[1]/reviews.length:0).toFixed(2)*100}%`}</div>
                    </div>
                </div>
            </div>


            </div>
            <div>
            <div className='sp-rvtitle'>Top reviews from the United States</div>
            {reviews.length==0&&(
             <div>No review for this product yet</div>
            )}
            {reviews.map(({id,user,comments,stars})=>(
            <div key={id} className="sp-review">
                <div className="userinfo">
                <i className="fa-regular fa-circle-user" />
                <div className="username">
                <div className="name">{user.username}</div>
               </div>
               </div>

               <div class="rating-content" data-rating={rateround(stars)}>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  </div>  
               <div className='sp-rvcontext'>Verified Purchase</div>
               <div className="review">{comments}</div>
            </div>
            
             ))}
           </div>
           </div>




        </div>
    ) 
}

export default SingleProduct;