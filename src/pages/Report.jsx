import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerReport } from '../features/reportSlice';

const Report = () => {
  let token = localStorage.getItem("key");
  const { isLoading, error, data} = useSelector((state) => state.report);
  const dispatch = useDispatch();

  const [myValue, setMyValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleStatusChange = (e) => {
    setMyValue(e.target.value);
  }


  const getReport = (e) => {
    e.preventDefault();
    
    if (token) {
      dispatch(getCustomerReport({token, item: myValue}));
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);


  return (
    <>
    <form style={{ width: '100%' }} onSubmit={getReport}>
        <div className="form-group mb-4">
          <label>Select Report</label>
          <select className='w-100' name='delivery_status' value={myValue} onChange={handleStatusChange}>
            <option value="">--Choose Option--</option>
            <option value="customers">Customers</option>
            <option value="products">Products</option>
            <option value="orders">Orders</option>
          </select>
          <button className='log-btn mt-3'>Get Report</button>
        </div>
      </form>
      
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error?.message || 'Something went wrong'}</div>
      ) : (
        <>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div className="d-block d-lg-flex justify-content-between" key={item.id}>
                {myValue === 'customers' && (
                  <>
                    <div className="doub">
                      <p>Name</p>
                      <p>{item.name}</p>
                    </div>
                    <div className="doub">
                      <p>Email</p>
                      <p>{item.email}</p>
                    </div>
                    <div className="doub">
                      <p>Phone Number</p>
                      <p>{item.phone_number}</p>
                    </div>
                    <div className="doub">
                      <p>Status</p>
                      <p>{item.account_status}</p>
                    </div>
                  </>
                )}

                {myValue === 'products' && (
                  <>
                    <div className="doub">
                      <p>Product Name</p>
                      <p>{item.product_name}</p>
                    </div>
                    <div className="doub">
                      <p>Price</p>
                      <p>{item.price}</p>
                    </div>
                    <div className="doub">
                      <p>Stock</p>
                      <p>{item.stock}</p>
                    </div>
                    <div className="doub">
                      <p>Category</p>
                      <p>{item.category_name}</p>
                    </div>
                  </>
                )}

                {myValue === 'orders' && (
                  <>
                    <div className="doub">
                      <p>Order Date</p>
                      <p>{item.date}</p>
                    </div>
                    <div className="doub">
                      <p>Order Total</p>
                      <p>{item.total}</p>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div>No {myValue} found</div>
          )}

          <div>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} disabled={currentPage === i + 1}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Report
