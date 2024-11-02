// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import Cards from './Cards';
// import Product from './Product';
// import Company from './Company';
// import Customer from './Customer';
// import Order from './Order';
// import Admin from '../components/Admin';
// import Report from './Report';
// import { Profile } from '../assets/images';
// import Cart from './Cart';
// import IconItem from './IconItem';
// import { useCart } from './CartContext'
// import './pages.css';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const { cartItems } = useCart();
//   const [activeContent, setActiveContent] = useState('dashboard');
//   const [cartOpen, setCartOpen] = useState(false);
//   const navigate = useNavigate(); 
//   // const [cartItems, setCartItems] = useState(() => {
//   //   // Initialize state with localStorage value
//   //   return JSON.parse(localStorage.getItem('cart')) || [];
//   // });


//   const handleButtonClick = (content) => {
//     setActiveContent(content);
//     setCartOpen(false);
//   };


//   const handleCartClick = () => {
//     setCartOpen(true);
//   };

//   const upperLetter = (string) => {
//     if (!string) return '';
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   useEffect(() => {
//     const authToken = localStorage.getItem('key');
//     if (!authToken) {
//         console.log("No auth token found, redirecting..."); // Debugging line
//         navigate('/', { replace: true });
//     }
// }, [navigate]);

//   const handleLogout = () => {
//     console.log("Logging out..."); // Debugging line
//     localStorage.removeItem('key');
//     localStorage.removeItem('cart');
//     navigate('/', { replace: true }); // Redirects to login page
// };
//   // useEffect(() => {
//   //   const loadCartItems = () => {
//   //     const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
//   //     setCartItems(storedCartItems);
//   //   };

//   //   // Load initial cart items
//   //   loadCartItems();

//   //   // Add event listener for storage changes
//   //   window.addEventListener('storage', loadCartItems);

//   //   // Add custom event listener for cart updates
//   //   window.addEventListener('cartUpdated', loadCartItems);

//   //   return () => {
//   //     window.removeEventListener('storage', loadCartItems);
//   //     window.removeEventListener('cartUpdated', loadCartItems);
//   //   };
//   // }, []);


//   // Update cart items in localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//     console.log('Current cart items:', cartItems);
//   }, [cartItems]);

  

//   const handleAddToCart = (item) => {
//     const newCartItems = [...cartItems, item];
//     setCartItems(newCartItems);
//     localStorage.setItem('cart', JSON.stringify(newCartItems));
//   };

//   const updateCart = (newCart) => {
//     setCartItems(newCart);
//     localStorage.setItem('cart', JSON.stringify(newCart));
//   };



// // Add this in your Dashboard component
// useEffect(() => {
//   console.log('Current cart items:', cartItems);
// }, [cartItems]);

//   return (
//     <>
//       <input type="checkbox" id="nav-toggle"/>
//       <Sidebar onButtonClick={handleButtonClick} activeContent={activeContent}/>
//       <div className="main-content mt-5 mt-lg-5 p-3">
//         <header className='d-flex justify-content-between'>
//           <div className="head-left d-flex">
//             <label htmlFor="nav-toggle">
//               <span className="las la-bars" style={{fontSize: '32px', lineHeight: '1.4'}}></span>
//             </label>
//             <h3 style={{ lineHeight: '1.6'}} className="mx-3 vega">{upperLetter(activeContent)}</h3>
//           </div>
//           <div className="head-right mt-2 mr-5" >
//             <div style={{ position: 'relative' }}>
//             <IconItem 
//               itemCount={cartItems.length} 
//               onClick={handleCartClick}
//             />

//               {cartItems.length > 0 && (
//                 <span className="cart-item-count" style={{
//                   position: 'absolute',
//                   top: '-10px',
//                   right: '-10px',
//                   background: '#FF962E',
//                   borderRadius: '50%',
//                   color: '#FFF',
//                   padding: '0px 7px',
//                   fontSize: '12px',
//                 }}>
//                   {cartItems.length}
//                 </span>

//               )}
//             </div>
//             {/* <img src={Profile} alt="" /> */}
//           </div>
//           <button onClick={handleLogout} className="btn btn-danger">Logout</button>
//         </header>

//         {cartOpen ? (
//           <Cart cartItems={cartItems} 
//           updateCart={updateCart} />
//         ) : (
//           <>
//             {activeContent === 'dashboard' && <Cards updateCart={updateCart}/> }
//             {activeContent === 'product management' && <Product updateCart={updateCart}/> }
//             {activeContent === 'company management' && <Company updateCart={updateCart}/> }
//             {activeContent === 'customer management' && <Customer updateCart={updateCart}/> }
//             {activeContent === 'order management' && <Order updateCart={updateCart}/> }
//             {activeContent === 'reports' && <Report updateCart={updateCart}/> }
//             {activeContent === 'admin settings' && <Admin updateCart={updateCart}/> }
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import Cards from './Cards';
import Product from './Product';
import Company from './Company';
import Customer from './Customer';
import Order from './Order';
import Admin from '../components/Admin';
import Report from './Report';
import Cart from './Cart';
import IconItem from './IconItem';
import { useCart } from './CartContext';
import './pages.css';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


import { resetLoginState } from '../features/loginSlice';

const Dashboard = () => {
  const { cartItems } = useCart();
  const [activeContent, setActiveContent] = useState('dashboard');
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleButtonClick = (content) => {
    setActiveContent(content);
    setCartOpen(false);
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const upperLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = localStorage.getItem('key');
      if (!authToken && !isLoggingOut) {
        navigate('/', { replace: true });
      }
    };
    
    checkAuth();
  }, [navigate, isLoggingOut]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Show loading state
      Swal.fire({
        title: 'Logging out...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Reset Redux state
      dispatch(resetLoginState());
      
      // Clear localStorage
      localStorage.clear();
      
      // Small delay to ensure state updates are processed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Close the loading dialog
      Swal.close();
      
      // Navigate to login
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
      
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: 'An error occurred during logout. Please try again.',
        confirmButtonColor: '#FF962E'
      });
    }
  }

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // If logging out, show nothing or a loading spinner
  if (isLoggingOut) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Logging out...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <input type="checkbox" id="nav-toggle"/>
      <Sidebar onButtonClick={handleButtonClick} activeContent={activeContent}/>
      <div className="main-content mt-5 mt-lg-5 p-3">
        <header className="d-flex justify-content-between">
          <div className="head-left d-flex">
            <label htmlFor="nav-toggle">
              <span className="las la-bars" style={{fontSize: '32px', lineHeight: '1.4'}}></span>
            </label>
            <h3 style={{ lineHeight: '1.6'}} className="mx-3 vega">{upperLetter(activeContent)}</h3>
          </div>
          <div className="head-right mt-2 mr-5">
            <div style={{ position: 'relative' }}>
              <IconItem 
                itemCount={cartItems.length} 
                onClick={handleCartClick}
              />
              {cartItems.length > 0 && (
                <span className="cart-item-count" style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#FF962E',
                  borderRadius: '50%',
                  color: '#FFF',
                  padding: '0px 7px',
                  fontSize: '12px',
                }}>
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
          <FontAwesomeIcon 
          icon={faRightFromBracket}
            onClick={handleLogout} 
            className="btn btn-danger"
            disabled={isLoggingOut}
            style={{ backgroundColor: '#FF962E' }}
          />
            {/* {isLoggingOut ? (
              <>
                <div className="spinner-border spinner-border-sm text-light me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Logging out...
              </>
            ) : (
              'Logout'
            )} */}
        </header>

        {cartOpen ? (
          <Cart cartItems={cartItems} updateCart={updateCart} />
        ) : (
          <>
            {activeContent === 'dashboard' && <Cards updateCart={updateCart}/> }
            {activeContent === 'product management' && <Product updateCart={updateCart}/> }
            {activeContent === 'company management' && <Company updateCart={updateCart}/> }
            {activeContent === 'customer management' && <Customer updateCart={updateCart}/> }
            {activeContent === 'order management' && <Order updateCart={updateCart}/> }
            {activeContent === 'reports' && <Report updateCart={updateCart}/> }
            {activeContent === 'admin settings' && <Admin updateCart={updateCart}/> }
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
