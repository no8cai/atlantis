// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history=useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef?.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  
  const signin = (e) => {
    e.preventDefault();
    history.push("/login")
    closeMenu();
  };

  const sellcentral = (e) => {
    e.preventDefault();
    history.push("/sellercentral")
    closeMenu();
  };


  const signup = (e) => {
    e.preventDefault();
    history.push("/signup")
    closeMenu();
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div onClick={openMenu} className='profile-dropbutton'>
       <div className="profile-context"><div>Hello,</div> {user?(<div>{user.username}</div>):(<div>sign in</div>)} </div><div className="profile-contextb">Account & Lists</div>
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="profile-logindropdownsec">
            <div className="pf-dptopsec">Manage</div>
            <div className="pf-dpinfosec">
            <div className="pf-dptitle">Your account</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div onClick={sellcentral} className='pf-dpbuttom'>Seller Central</div>
            <div>
              <div onClick={logout} className='pf-dpbuttom'>Sign Out</div>
            </div>
            </div>
            </div>
          </>
        ) : (
          <>
            <div className="profile-dropdownsec">
              <button onClick={signin} className='form-button profile-signbuttom'>Sign in</button>
              <div className='signup-bottomsec'> 
                <div>New customer?</div>
                <div className='signup-signin' onClick={signup}>Start here</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;