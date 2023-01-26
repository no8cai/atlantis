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
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
        Hello,{user?(<div>{user.username}</div>):(<div>sign in</div>)}, Account&List
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div onClick={sellcentral}>seller central</div>
            <div>
              <button onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <div>
              <button onClick={signin}>Sign in</button>
              <button onClick={signup}>New customer start here</button>
            </div>
            {/* <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            /> */}
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;