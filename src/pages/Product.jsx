import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails, selectSearchDetails, selectCurrentPage, selectTotalPages,  } from '../features/allProductSlice'
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
  const [myValue, setMyValue] = useState('')

  const searchDetails = useSelector(selectSearchDetails);
  const currentPage = useSelector(selectCurrentPage);
  const total_pages = useSelector(selectTotalPages);

  const dispatch = useDispatch();

  let token = localStorage.getItem("key");

  useEffect(() => {
    if (token) {
      dispatch(fetchDetails({ token, searchValue: myValue }));
    }
  }, [dispatch, token, myValue]);

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

  console.log(searchDetails)
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
          <input type="text" placeholder="Search Order..." className="search-input" value={myValue} onChange={(e) => setMyValue(e.target.value)}/>
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


      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Product image</th>
                <th>Product Name</th>
                <th>Product Status</th>
                <th>Product Price</th>
                <th>Product Description</th>
                <th>Product Number</th>
                <th>Discount</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
            {searchDetails && searchDetails.data?.length > 0 ? (
              searchDetails.data.map((search) => (
                <tr key={search.id}>
                  <td>
                    <img
                      src={typeof search.images[0]?.filename === 'string' ? search.images[0]?.filename : 'default_image.png'}
                      alt={search.product_name}
                      width={100}
                    />
                  </td>
                  <td>{search.product_name}</td>
                  <td>{search.status}</td>
                  <td>{search.price}</td>
                  <td>{search.product_description}</td>
                  <td>{search.product_number}</td>
                  <td>{search.discount}</td>
                  <td>{search.total_rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No products available</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
      {total_pages > 1 && (
            <div className="pagination">
              {Array.from({ length: total_pages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  disabled={currentPage === i + 1}
                  className="mx-1"
                  style={{
                    backgroundColor: '#FF962E', 
                    borderRadius: '10px',
                    border: '0'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
    </>
  )
}

export default Product
