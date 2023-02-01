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
    const errors=[]
    if(username.length<=0){errors.push("username field is required");}
    else if(username.length>=40){errors.push("username must be less than 40 characters")}
    if(email.length<=0){errors.push("email field is required");}
    else if (!email.includes("@")){errors.push("a valid email address is required");}
    if(password.length<=0){errors.push("password field is required");}
    else if(password.length<6){errors.push("password must be at least 6 characters")}
    else if(password.length>=255){errors.push("username must be less than 255 characters")}
    if(repeatPassword.length<=0){errors.push("repeatpassword field is required");}
    else if(repeatPassword!=password){errors.push("repeatpassword must match the password");}
    if(city.length<=0){errors.push("city field is required");}
    else if(!isNaN(city)){errors.push("city can not be only numbers");}
    else if(!isNaN(city[0])){errors.push("city can not be start with numbers");}
    else if(city.length>=40){errors.push("city must be less than 40 characters")}
    if(state.length<=0){errors.push("state field is required");}
    else if(state.length>=40){errors.push("state must be less than 40 characters")}
    if(zipcode.length<=0){errors.push("zipcode field is required");}
    else if (isNaN(zipcode)){errors.push("zipcode must be valide 5 digits numbers in US");}
    else if(zipcode<=0){errors.push("zipcode must be valide 5 digits numbers in US");}
    else if(zipcode.length!=5){errors.push("zipcode must be 5 digits numbers in US");}

    setErrors(errors)
    if (!errors.length) {
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
      <div className='singin-errorsec'>
        {errors.map((error, ind) => (
          <div key={ind} className='signin-errors'><i className="fa-solid fa-circle-exclamation"/>{error}</div>
        ))}
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
