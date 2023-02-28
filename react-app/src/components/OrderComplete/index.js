import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./OrderComplete.css"


const Ordercomplete=()=>{


    const history=useHistory()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    
    const gotoOrderEvents=()=>{
        history.push('/orderdetails')
    }



    return (
        <div className="oc-entiresec">
           <div className="oc-upsec">
               <div className="oc-upinnersec">
                <div className="oc-upleftsec">
                 <div className="oc-upfirst"><i className="fa-solid fa-circle-check"/>Order placed, thanks!</div>
                 <div>Confirmation will be sent to your email</div>
                {!!sessionUser && (<div>
                    <span className="oc-upsecond">Shipping to {sessionUser.username.toUpperCase()},&nbsp;</span>
                    {`${sessionUser.city.toUpperCase()}, ${sessionUser.state.toUpperCase()}, ${sessionUser.zipcode}, United States`}</div>
                 
                    )
                }
                <div className="oc-upleftsecond">
                 <div>Order items will be delivered in One day for Prime members</div>
                 <div className="oc-orderlink" onClick={()=>{gotoOrderEvents()}}>Reiview or edit your recnt orders {">"}</div>
                 </div>
                 </div>
                 <div className="oc-uprightsec">
                    <img src="http://app-bucket-eric001.s3.amazonaws.com/58af59d8b821455d802b5cd3db3ef6da.png"/>
                 </div>
              </div>
            </div>
        </div>
    )
}

export default Ordercomplete