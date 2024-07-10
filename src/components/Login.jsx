import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Logo2 } from '../assets/images'
import '../pages/pages.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
        <div className="form-item text-center">
            <img src={ Logo2 } alt="" className='w-25 mt-5'/>
            <h2 className='mt-5 text-center'>Login to your account</h2>
            <form className='m-auto'>
                <div className="form-group mb-4">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" placeholder='Johnsonduru@gmail.com'/>
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                    <label for="exampleInputPassword1">Password</label>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password'/>
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
                    {showPassword ? <FontAwesomeIcon icon={faEye} style={{color: '#FF962E'}}/> : <FontAwesomeIcon icon={faEyeSlash} style={{color: '#FF962E'}}/>}
                    </span>
                </div>
                <div className="mt-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className='f-btn'>Forgot your password?</button>
                </div>
                
                <button>Log In</button>
            </form>
        </div>
      
    </React.Fragment>
  )
}

export default Login
