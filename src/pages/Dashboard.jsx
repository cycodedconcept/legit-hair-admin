import React, { useState } from 'react';
import Sidebar from './Sidebar'
import Cards from './Cards'
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
    <React.Fragment>
      <Sidebar onButtonClick={handleButtonClick} activeContent={activeContent}/>
      <div className="main-content mt-5 p-3">
          <header>
            <i className="las la-bars" style={{fontSize: '32px'}}></i>
            <h3 style={{ lineHeight: '1.2'}} className="mx-3">{upperLetter(activeContent)}</h3>
          </header>
          {activeContent === 'dashboard' && <Cards /> }
      </div>
    </React.Fragment>
  )
}

export default Dashboard
