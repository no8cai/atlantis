// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './atlogo.png'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Navigation(){
  
  const sessionUser = useSelector(state => state.session.user);
  const [searchitem, setSearchitem] = useState("");
  const history=useHistory()

  // useEffect(() => {
  
  // }, [searchitem]);

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
          buttonStyle={'navigaion-notloginleft'}
          modalComponent={<LoginFormModal />}
         />}
         </div>
    );
  }

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
           <NavLink exact to="/orderdetails" className='ng-secondsec'><div className='profile-context'>Returns</div> <div className='np-seconddown'>& Orders</div></NavLink>
           <div>
           <NavLink exact to="/cartitems" className={'ng-thirdsec'}><i className="fa-sharp fa-solid fa-cart-plus"></i></NavLink>
            </div>
      </div>
      {/* <div>{isLoaded && sessionLinks}</div> */}
    </div>
  );
}

export default Navigation;