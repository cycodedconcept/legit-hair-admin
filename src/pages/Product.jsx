import React, { useState } from 'react';
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


  const changeColor = (index) => {
    setActive(index);
  };

  const showProductForm = (e) => {
    e.preventDefault();
    setPro(false)
    setSearch(false)
    setDt(false)
    setForm(true)
  }

  const getMyStatus = myStatus.map((item, index) => 
    <button key={index} className={index === active ? 'active-item': 'inactive-item'} onClick={() => changeColor(index)}>
      {item}
    </button>
  )
  return (
    <>
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
