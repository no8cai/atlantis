// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './atlogo.png'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { fetchUserCartItems } from "../../store/cartitem";
import { useEffect } from 'react';


function Navigation(){
  
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const cartitemsObj = useSelector(state => state.cartitems);
  const usercartitems=Object.values(cartitemsObj)
  const [searchitem, setSearchitem] = useState("");
  const history=useHistory()

  useEffect(() => {
    dispatch(fetchUserCartItems());
}, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchitem}`)
  }


  let addressbar;
  if (sessionUser) {
    addressbar = (
      <div className='navigation-leftright'>
        <div className='navigation-locationbar'><i className="fa-solid fa-location-dot"></i><div>Deliver to {`${sessionUser.username},`}</div></div>
        <div className='np-seconddown'>{`${sessionUser.city.slice(0,8)} ${sessionUser.zipcode}`}</div>
      </div>
    );
  } else {
    addressbar = (
         <div>
           {<OpenModalButton
          buttonText={<div className='navigation-leftright'>
            <div>Hello,</div>
            <div className='navigation-leftcontext'>Select your address</div>
            </div>
          }
          buttonClass={'navigaion-notloginleft'}
          modalComponent={<LoginFormModal />}
         />}
         </div>
    );
  }

  if(!cartitemsObj) return null
  return (
    <div className='navigation-section'>
      <div className='navigation-leftsec'>
        <div className='topbutton'>
         <NavLink exact to="/" className={'navigation-logo'}><img className='navigation-sublogo' src={logo}/></NavLink>
        </div>
        <div className='navigation-address'>
          {addressbar}
        </div>
      </div>
      <div className="search-container">
      <form className='form-input' onSubmit={handleSubmit}>
      <input 
           type="text" 
           placeholder="Search Atlentis" 
           onChange={(e) => setSearchitem(e.target.value)}
           value={searchitem}
           name="search"/>
      <button type="submit"><i className="fa fa-search"></i></button>
      </form>
     </div>
      <div className='navigation-rightsec'>
           <div><ProfileButton user={sessionUser} /></div>
           {!!sessionUser &&(<NavLink exact to="/orderdetails" className='ng-secondsec'><div className='profile-context'>Returns</div> <div className='np-seconddown'>& Orders</div></NavLink>)}
           {!sessionUser &&(<NavLink exact to="/login" className='ng-secondsec'><div className='profile-context'>Returns</div> <div className='np-seconddown'>& Orders</div></NavLink>)}
           <div className='nv-cartsec'>
           <NavLink exact to="/cartitems" className={'ng-thirdsec'}><i className="fa-sharp fa-solid fa-cart-plus"/>
           </NavLink>
           <div className='nv-cartnumber'>{usercartitems.length}</div>
            </div>
            
      </div>
      {/* <div>{isLoaded && sessionLinks}</div> */}
    </div>
  );
}

export default Navigation;