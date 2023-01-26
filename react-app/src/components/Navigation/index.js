// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation(){
  
  const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <li>
  //       <ProfileButton user={sessionUser} />
  //     </li>
  //   );
  // } else {
  //   sessionLinks = (
  //     <li>
  //       {/* <OpenModalButton
  //         buttonText="Log In"
  //         modalComponent={<LoginFormModal />}
  //       /> */}
  //       <NavLink to="/login">Log in</NavLink>
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </li>
  //   );
  // }

  let addressbar;
  if (sessionUser) {
    addressbar = (
      <div>
        <div>deliver to {`${sessionUser.city} ${sessionUser.zipcode}`}</div>
      </div>
    );
  } else {
    addressbar = (
         <div>
           {<OpenModalButton
          buttonText={<div>
            <div>Hello</div>
            <div>Select your address</div>
            </div>
          }
          modalComponent={<LoginFormModal />}
         />}
         </div>
    );
  }

  return (
    <div className='navigation-section'>
      <div className='navigation-leftsec'>
        <div>
         <NavLink exact to="/">Logo</NavLink>
        </div>
        <div>
          {addressbar}
        </div>
      </div>
      <div className="search-container">
      <form action="/action_page.php">
      <input type="text" placeholder="Search.." name="search"/>
      <button type="submit"><i className="fa fa-search"></i></button>
      </form>
     </div>
      <div className='navigation-rightsec'>
           <div><ProfileButton user={sessionUser} /></div>
           <div>Returns&Orders</div>
           <div>Cart</div>
      </div>
      {/* <div>{isLoaded && sessionLinks}</div> */}
    </div>
  );
}

export default Navigation;