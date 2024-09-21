import React, { useState } from 'react';
import Sidebar from './Sidebar'
import Cards from './Cards';
import Product from './Product';
import Order from './Order';
import { Bell, Profile } from '../assets/images'
import './pages.css'



const Dashboard = () => {
  const [activeContent, setActiveContent] = useState('dashboard');

  const handleButtonClick = (content) => {
    setActiveContent(content);
  };

  const upperLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <Sidebar onButtonClick={handleButtonClick} activeContent={activeContent}/>
      <div className="main-content mt-5 p-3">
          <header className='d-flex justify-content-between'>
            <div className="head-left d-flex">
              <i className="las la-bars" style={{fontSize: '32px'}}></i>
              <h3 style={{ lineHeight: '1.2'}} className="mx-3">{upperLetter(activeContent)}</h3>
            </div>
            <div className="head-right">
              <img src={Bell} alt="" className='mx-3'/>
              <img src={Profile} alt="" />
            </div>
          </header>
          {activeContent === 'dashboard' && <Cards /> }
          {activeContent === 'product management' && <Product /> }
          {activeContent === 'order management' && <Order /> }
      </div>
    </>
  )
}

export default Dashboard
