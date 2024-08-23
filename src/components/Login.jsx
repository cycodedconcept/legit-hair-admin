import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Logo2, Success } from '../assets/images';
import '../pages/pages.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [forget, setForget] = useState(false);
  const [recoverOtp, setRecoverOtp] = useState(false);
  const [change, setChange] = useState(false);
  const [success, setSucess] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const inputs = useRef([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setConfirmPassword(!confirmPassword);
  };


  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleBackspace = (element, index) => {
    if (element.previousSibling && otp[index] === '') {
      element.previousSibling.focus();
    }
  };

//   useEffect(() => {
//     inputs.current[0].focus();
//   }, []);

  return (
    <>
      <div className="form-item text-center">
        <img src={Logo2} alt="Logo" className='mt-5' />

        {showLogin && (
          <>
            <h2 className='mt-5 text-center'>Login to your account</h2>
            <form className='m-auto'>
              <div className="form-group mb-4">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" placeholder='Johnsonduru@gmail.com' />
              </div>
              <div className="form-group" style={{ position: 'relative' }}>
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    top: '70%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <FontAwesomeIcon icon={faEye} style={{ color: '#FF962E' }} /> : <FontAwesomeIcon icon={faEyeSlash} style={{ color: '#FF962E' }} />}
                </span>
              </div>
              <div className="my-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" className='f-btn' onClick={() => { setShowLogin(false); setForget(true); }}>Forgot your password?</button>
              </div>
              <button className='log-btn'>Log In</button>
            </form>
            <div className="switch-account mt-3">
              <h5 style={{ color: '#6C7587' }}>
                Don't have an account? <span style={{ color: '#FF962E' }}>Create an account</span>
              </h5>
            </div>
          </>
        )}

        {forget && (
          <>
            <h2 className='mt-5 text-center'>Forgot Password?</h2>
            <p className='my-5' style={{ color: '#6C7587' }}>
              Enter your email address associated with your<br /> account to receive a confirmation code.
            </p>
            <form className='m-auto'>
              <div className="form-group mb-4">
                <label htmlFor="exampleInputEmail1">Enter your email address</label>
                <input type="email" placeholder='John*******@g****.com' />
              </div>
              <button type="button" className='log-btn' onClick={() => { setForget(false); setRecoverOtp(true); }}>Continue</button>
            </form>
          </>
        )}

        {recoverOtp && (
          <>
            <h2 className='mt-5 text-center'>Enter reset code</h2>
            <p className='my-5' style={{ color: '#6C7587' }}>
              We sent a Reset code to John*******@g****.com<br />
              If you didn't get the confirmation code in your inbox<br />
              please <span style={{ color: '#FF962E', cursor: 'pointer' }}>Click here</span>
            </p>
            <form className='m-auto'>
              <div className="form-group mb-4 text-center">
                <div className="otp-container">
                  {otp.map((data, index) => {
                    return (
                      <input
                        key={index}
                        type="text"
                        className="otp-field"
                        maxLength="1"
                        ref={(el) => (inputs.current[index] = el)}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyUp={(e) => {
                          if (e.key === 'Backspace') handleBackspace(e.target, index);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <button className='log-btn'>Continue</button>
            </form>
          </>
        )}

        {change ? (
        <>
        <h2 className='mt-5 text-center'>Reset password</h2>
            <form className='m-auto'>
              <div className="form-group mb-3" style={{ position: 'relative' }}>
                <label htmlFor="exampleInputPassword1">Enter a new password</label>
                <input type={confirmPassword ? 'text' : 'password'} placeholder='Enter Password' />
                <span
                  onClick={togglePasswordVisibility2}
                  style={{
                    position: 'absolute',
                    top: '70%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  {confirmPassword ? <FontAwesomeIcon icon={faEye} style={{ color: '#FF962E' }} /> : <FontAwesomeIcon icon={faEyeSlash} style={{ color: '#FF962E' }} />}
                </span>
              </div>

              <div className="form-group mb-3" style={{ position: 'relative' }}>
                <label htmlFor="exampleInputPassword1">Re-enter password</label>
                <input type={confirmPassword ? 'text' : 'password'} placeholder='Confirm Password' />
                <span
                  onClick={togglePasswordVisibility2}
                  style={{
                    position: 'absolute',
                    top: '70%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                >
                  {confirmPassword ? <FontAwesomeIcon icon={faEye} style={{ color: '#FF962E' }} /> : <FontAwesomeIcon icon={faEyeSlash} style={{ color: '#FF962E' }} />}
                </span>
              </div>
              
              <button className='log-btn'>Continue</button>
            </form>
        </>): ('')}

        {success ? (
          <>
            <div className="su-section">
            <img src={ Success } alt=""/>
            </div>
            <h2 className='mt-5 text-center'>Sucessfully Changed</h2>
            <p className='my-5' style={{ color: '#6C7587' }}>
              Your password has been sucessfully changed you can<br></br> now proceed to login.
            </p>
            <form className='m-auto'>
              <button type="button" className='log-btn'>Continue</button>
            </form>
          </>
        ):('')}    
      </div>
    </>
  );
};

export default Login;
