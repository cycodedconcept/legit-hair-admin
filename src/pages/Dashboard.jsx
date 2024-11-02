import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Cards from './Cards';
import Product from './Product';
import Company from './Company';
import Customer from './Customer';
import Order from './Order';
import Admin from '../components/Admin';
import Report from './Report';
import { Profile } from '../assets/images';
import Cart from './Cart';
import IconItem from './IconItem';
import { useCart } from './CartContext'
import './pages.css';

const Dashboard = () => {
  const { cartItems } = useCart();
  const [activeContent, setActiveContent] = useState('dashboard');
  const [cartOpen, setCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState(() => {
  //   // Initialize state with localStorage value
  //   return JSON.parse(localStorage.getItem('cart')) || [];
  // });


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

  // useEffect(() => {
  //   const loadCartItems = () => {
  //     const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  //     setCartItems(storedCartItems);
  //   };

  //   // Load initial cart items
  //   loadCartItems();

  //   // Add event listener for storage changes
  //   window.addEventListener('storage', loadCartItems);

  //   // Add custom event listener for cart updates
  //   window.addEventListener('cartUpdated', loadCartItems);

  //   return () => {
  //     window.removeEventListener('storage', loadCartItems);
  //     window.removeEventListener('cartUpdated', loadCartItems);
  //   };
  // }, []);


  // Update cart items in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('Current cart items:', cartItems);
  }, [cartItems]);

  

  const handleAddToCart = (item) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };



// Add this in your Dashboard component
useEffect(() => {
  console.log('Current cart items:', cartItems);
}, [cartItems]);

  return (
    <>
      <input type="checkbox" id="nav-toggle"/>
      <Sidebar onButtonClick={handleButtonClick} activeContent={activeContent}/>
      <div className="main-content mt-2 mt-lg-5 p-3">
        <header className='d-flex gap-5'>
          <div className="head-left d-flex">
            <label htmlFor="nav-toggle">
              <span className="las la-bars" style={{fontSize: '32px', lineHeight: '1.4'}}></span>
            </label>
            <h3 style={{ lineHeight: '1.7'}} className="mx-3 vega">{upperLetter(activeContent)}</h3>
          </div>
          <div className="head-right mt-2 mr-5" >
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
                  padding: '2px 5px',
                  fontSize: '12px',
                }}>
                  {cartItems.length}
                </span>

              )}
            </div>
            {/* <img src={Profile} alt="" /> */}
          </div>
        </header>

        {cartOpen ? (
          <Cart cartItems={cartItems} 
          updateCart={updateCart} />
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
