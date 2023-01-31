import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './auth.css'
import logo from '../Navigation/atlogoseller.png'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history=useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
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


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const createnewEvents=()=>{
      history.push("/signup")
    }
  
  const logoEvents=()=>{
      history.push('/')
    }  

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-section'>
    <div><img className='login-sublogo' src={logo} onClick={()=>logoEvents()}/></div>
    <form onSubmit={onLogin} className='login-form'>
      <div className='login-formtitle'>Sign in</div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-formitem'>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='login-formitem'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit' className='login-buttom'>Login</button>
        <div className='login-subtext'>By login, you agree to Atlantis's Conditions of Use and Privacy Notice.</div>
      </div>
    </form>
    <div className='login-demouser' onClick={onLoginEric}>Demo User1</div>
    <div className='login-demouser'onClick={onLoginWife}>Demo User2</div>
    <div className='login-bottomsec'>New to Atlantis?</div>
    <div className='login-createnew' onClick={()=>createnewEvents()}>Create your Atlantis account</div>
    </div>
  );
};

export default LoginForm;
