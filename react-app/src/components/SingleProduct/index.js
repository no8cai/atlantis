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
        // let errors=[]

        dispatch(fetchCreateCartItem(tempcartitem,productId))
        .then(()=>{history.push(`/cartitems`)})
        // .catch(async (err)=>{
        //  const errobj=await err.json();
        //  errors.push(errobj.message)
        //  setValidationErrors(errors)
        //   });

    } 



    if(!singleproduct) return (<div className='sp-broken'>This page was not able to load</div>)

    return (
        <div>
           <div className='singleproject-topsec'>
             <div className='singleproject-imagesec'><img src={singleproduct.imageUrl} className="singleproduct-image"/></div>
             <div>
                <div>{singleproduct.title}</div>
                <div>{singleproduct.price}</div>
                <div>{singleproduct.style}</div>
                <div>{singleproduct.about}</div>
             </div>
             <div>
                <div>Buy new:</div>
                <div>{singleproduct.price}</div>
                <div>In stock</div>
                 <div>
                    <div>select quantity</div>
                    <form className='productform-form' onSubmit={handleSubmit}>
                    <div>
                        <select
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        >
                                {arrGenerator(singleproduct.inventory).map(number => (
                                  <option key={number} value={number}> {number}</option>
                               ))}
                        </select>
                    </div>
                    <input type="submit" value='Add to Cart'/>
                   </form>
                 </div>
             </div>
           </div>
           <div>realative items</div>
           <div>production information</div>
           <div>{singleproduct.description}</div>
           <div>review</div>

        </div>
    ) 
}

export default SingleProduct;