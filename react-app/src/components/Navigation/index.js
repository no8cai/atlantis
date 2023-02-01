// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './atlogo.png'

function Navigation(){
  
  const sessionUser = useSelector(state => state.session.user);



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
      <form action="/action_page.php" className='form-input'>
      <input type="text" placeholder="Search Atlentis" name="search" disabled="True" title="Feature coming soon!" id='do-not-interact'/>
      <button type="submit" disabled="True" title="Feature coming soon!"><i className="fa fa-search" id='do-not-interact'></i></button>
      </form>
     </div>
      <div className='navigation-rightsec'>
           <div><ProfileButton user={sessionUser} /></div>
           <div className='ng-secondsec' id='do-not-interact' title="Feature coming soon!"><div className='profile-context'>Returns</div> <div className='np-seconddown'>& Orders</div></div>
           <div>
           <NavLink exact to="/cartitems" className={'ng-thirdsec'}><i className="fa-solid fa-cart-arrow-down"></i></NavLink>
            </div>
      </div>
      {/* <div>{isLoaded && sessionLinks}</div> */}
    </div>
  );
}

export default Navigation;