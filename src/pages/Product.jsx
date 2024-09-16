import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Select from './support/Select';
import Products from './support/Products';
import AddProduct from './support/AddProduct';
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
  const [pro, setPro] = useState(true);
  const [form, setForm] = useState(false);
  const [search, setSearch] = useState(true);
  const [dt, setDt] = useState(true);
  const [pr, setPr] = useState(false);


  const changeColor = (index) => {
    setActive(index);
  };

  const showProductForm = (e) => {
    e.preventDefault();
    setPro(false)
    setSearch(false)
    setDt(false)
    setForm(true)
    setPr(true)
  }

  const original = (e) => {
    e.preventDefault();
    setPro(true)
    setSearch(true)
    setDt(true)
    setForm(false)
    setPr(false)
  }

  const getMyStatus = myStatus.map((item, index) => 
    <button key={index} className={index === active ? 'active-item': 'inactive-item'} onClick={() => changeColor(index)}>
      {item}
    </button>
  )
  return (
    <>
    {pr ? (
      <div className="pro-header d-flex justify-content-between mt-3">
      <div className='d-flex gap-2 mt-3'>
        <p style={{color: '#FF962E'}}>Product</p>
        <p style={{color: '#6E7079'}}><FontAwesomeIcon icon={faCaretRight} style={{color: '#C2C6CE'}}/> Add Product</p>
      </div>

      <button className='pcancel' onClick={original}><FontAwesomeIcon icon={faTimes} style={{color: '#888', marginRight: '8px'}}/>Cancel</button>
    </div>
    ): ''}
    
    {search ? (
      <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-8">
        <div className="search-container">
          <input type="text" placeholder="Search Order..." className="search-input"/>
          <span className="search-icon">&#128269;</span>
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-lg-4 mt-5 mb-4">
        <button className='exp-btn'><img src={ Exp } alt="" /> Export</button>
        <button className='pro-btn' onClick={showProductForm}>+ Add Products</button>
      </div>
    </div>
    ): ''}
      
    {dt ? (
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
    ): ''}  
      

      {pro ? (
        <Products />
      ): ''}

      {form ? (
        <AddProduct />
      ): ''}
    </>
  )
}

export default Product
