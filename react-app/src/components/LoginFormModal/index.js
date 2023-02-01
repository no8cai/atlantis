import React, { useState } from "react";
import { login } from '../../store/session'
import {  useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory, Redirect } from "react-router-dom";
import '../auth/auth.css'

function LoginFormModal() {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const history = useHistory()

    const onLogin = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    };

    const updateEmail = (e) => {
      setEmail(e.target.value);
    };
  
    const updatePassword = (e) => {
      setPassword(e.target.value);
    };  

    const onLoginEric = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('eric@aa.io', 'password1'));
        if (data) {
          setErrors(data);
        }
      };

    const onLoginWife = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('ericwife@aa.io', 'password2'));
        if (data) {
          setErrors(data);
        }
      };

  if (user) {
    closeModal()
    // return <Redirect to='/profile' />;
  }


  return (
    <div className='login-holder'>
      <div className='login-line-holder'>
      </div>

      <div className='welcome'> <h3 className='weclome-h3'>Sign in for location</h3></div>

      <div className='form-holder'>

      <form className='login-form-css' onSubmit={onLogin}>

          <div className='input-holder'>
        <label>Email</label>
          <input
          className='input-line'
            type="text"
            value={email}
            placeholder='Please input the email address'
            title='Email Address'
            onChange={updateEmail}
            
          />
        
        <label>Password</label>
          <input
            type="password"
            className='input-line2'
            value={password}
            placeholder='Please input the password'
            title='Password'
            onChange={updatePassword}
           
          />
        
        </div>
        <div className='singin-errorsec'>
        {errors.map((error, ind) => (
          <div key={ind} className='signin-errors'><i className="fa-solid fa-circle-exclamation"/>{error}</div>
        ))}
      </div>
        <button className="form-button" type="submit">Sign in to see your addresses</button>
      </form>

      <div className='form-holder1'>

      <div className='login-break'>or</div>
      <button className="form-button" onClick={onLoginEric}>Sign in as a Demo User1</button>
      <button className="form-button" onClick={onLoginWife}>Sign in as a Demo User2</button>
      </div>

    </div>
    </div>
  );
}

export default LoginFormModal;
