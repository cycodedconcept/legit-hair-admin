import React, { useState } from 'react';
import Select from './support/Select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Exp } from '../assets/images';
import './pages.css'

const Product = () => {
  const myStatus = [
    "Product", "Active", "Stock", "Closed", 
    "Draft", "Enable", "Disable"
  ];

  const [active, setActive] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');


  const changeColor = (index) => {
    setActive(index);
  };

  const getMyStatus = myStatus.map((item, index) => 
    <button key={index} className={index === active ? 'active-item': 'inactive-item'} onClick={() => changeColor(index)}>
      {item}
    </button>
  )
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-8">
          <div className="search-container">
            <input type="text" placeholder="Search Order..." className="search-input"/>
            <span className="search-icon">&#128269;</span>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4 mt-5 mb-4">
          <button className='exp-btn'><img src={ Exp } alt="" /> Export</button>
          <button className='pro-btn'>+ Add Products</button>
        </div>
      </div>

      <div className="scub d-flex">
        <div className="pro d-flex ml-5">
            {getMyStatus}
        </div>
        <div className="pro-right d-flex">
          <div>
            <DatePicker 
              selected={selectedDate} 
              onChange={(date) => setSelectedDate(date)} 
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              className="date-picker"
              style={{ padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div>
            <Select />
          </div>
        </div>
      </div>

      
    </React.Fragment>
  )
}

export default Product
