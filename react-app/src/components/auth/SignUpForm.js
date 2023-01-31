import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../Navigation/atlogoseller.png'
import './auth.css'
import { useHistory } from 'react-router-dom';


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [city, setCity] = useState('');
  const [state, setState] = useState('Alabama');
  const [zipcode, setZipcode] = useState('00000');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history=useHistory();

  const allStates =
  ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "D. C.","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
  "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  ,"Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas", "U.S. Territories","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming", "International"]

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password,city,state,zipcode));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updateZipcode = (e) => {
    setZipcode(e.target.value);
  };


  const loginEvents=()=>{
    history.push('/login')
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
      <div className='login-form singup-outersec'>
      <div className='login-formtitle'>Create account</div>
    <form onSubmit={onSignUp} className='signupform-form'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-formitem'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          placeholder='Please input your username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='login-formitem'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          placeholder='Please provide a valid email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='login-formitem'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='At least 6 characters'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='login-formitem'>
        <label>Re-enter password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='login-formitem'>
        <label>City</label>
        <input
          type='text'
          name='city'
          placeholder='Please input your city'
          onChange={updateCity}
          value={city}
        ></input>
      </div>
      <div className='login-formitem'>
        <label>State</label>
            <select
             placeholder='State'
             onChange={updateState}
             value={state}
              >
            {allStates.map(state => (
              <option key={state} value={state}> {state}</option>
              ))}
             </select>
      </div>
      <div className='login-formitem'>
        <label>Zip code</label>
        <input
          type='text'
          name='zipcode'
          placeholder='Please input your 5 digis zipcode'
          onChange={updateZipcode}
          value={zipcode}
        ></input>
      </div>
      <button type='submit' className='login-buttom'>Sign Up</button>
    </form>
     <div className='login-subtext'>By creating an account, you agree to Atlantis's Conditions of Use and Privacy Notice.</div>
     <div className='signup-bottomsec'>
      <div>Already have an account?</div>
      <div className='signup-signin' onClick={()=>loginEvents()}>Sign in</div>
     </div>
    </div>
    </div>
  );
};

export default SignUpForm;
