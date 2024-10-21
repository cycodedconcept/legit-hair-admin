import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerReport } from '../features/reportSlice';

const Report = () => {
  let token = localStorage.getItem("key");
  const { isLoading, error, data} = useSelector((state) => state.report);
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState(false);
  const [product, setProduct] = useState(false);
  const [order, setOrder] = useState(false);
  const [show, setShow] = useState(false);
  const [myValue, setMyValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setMyValue(value);

    setCustomer(false);
    setOrder(false);
    setProduct(false);
    
    if (value === 'customers') {
      setCustomer(true);
    }
    else if (value === 'orders') {
      setOrder(true);
    }
    else if (value === 'products') {
      setProduct(true);
    } 
    setShow(false)
  }


  const getReport = (e) => {
    e.preventDefault();
    setShow(true);
    
    if (token) {
      dispatch(getCustomerReport({token, item: myValue}));
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data?.length / itemsPerPage);


  const downloadExcel = (data, sheetName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
    saveAs(blob, `${sheetName}.xlsx`);
  };

  const customerData = currentItems?.map(item => ({
    "Name": item.name,
    "Email": item.email,
    "Phone Number": item.phone_number,
    "Status": item.account_status,
  }));

  const orderData = currentItems?.map(item => ({
    "Customer Name": item.customerName,
    "Delivery Date": item.date,
    "Payment Status": item.paymentStatus,
    "Payment Method": item.paymentMethod,
    "Total Amount": item.totalAmountPaid,
    "Order ID": item.orderId,
    "Date Delivered": item.dateDelivered,
  }));

  const productData = currentItems?.map(item => ({
    "Product Name": item.name,
    "Product Price": item.price,
    "Product Discount": item.discount,
    "Product Description": item.product_description,
    "Product Number": item.product_number,
    "Product Stock": item.stock,
    "Order Count": item.orderCount,
    "Date Added": item.date_added,
  }));

  return (
    <>
    <div className="text-left mt-5 mt-lg-3">
      {customer && (
        <button className='pro-btn' onClick={() => downloadExcel(customerData, 'Customers')}>
          <FontAwesomeIcon icon={faFileExcel} className="mx-2"/>Customers Export to Excel
        </button>
      )}

      {order && (
        <button className='pro-btn' onClick={() => downloadExcel(orderData, 'Orders')}>
          <FontAwesomeIcon icon={faFileExcel} className="mx-2"/>Orders Export to Excel
        </button>
      )}

      {product && (
        <button className='pro-btn' onClick={() => downloadExcel(productData, 'Products')}>
          <FontAwesomeIcon icon={faFileExcel} className="mx-2"/>Products Export to Excel
        </button>
      )}
    </div>

    <form style={{ width: '100%' }} onSubmit={getReport}>
        <div className="form-group mb-4">
          <label>Select Report</label>
          <select className='w-100' name='report_type' value={myValue} onChange={handleStatusChange}>
            <option value="">--Choose Option--</option>
            <option value="customers">Customers</option>
            <option value="products">Products</option>
            <option value="orders">Orders</option>
          </select>
          <button className='log-btn mt-3'>Get Report</button>
        </div>
      </form>


      <div className='bodija'>
      {show ? (
        <>
         {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error?.message || 'Something went wrong'}</div>
      ) : (
        <>
          {myValue === 'customers' && (
            <div className="outer-wrapper" style={{maxWidth: '100%'}}>
              <div className="table-wrapper">
                <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.length > 0 ? (
                    currentItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.account_status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No customers found</td>
                    </tr>
                  )}
                </tbody>
                </table>
              </div>
            </div>
            
          )}

          {myValue === 'orders' && (
            <>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <>
                <div className="d-block d-lg-flex justify-content-between mb-5">
                  <div className='mb-3 doub'>
                    <p style={{color: '#FF962E'}}>Customer Name:</p>
                    <p>{item.customerName}</p>
                  </div>
                  <div className='mb-3 doub'>
                    <p style={{color: '#FF962E'}}>Delivery Date:</p>
                    <p>{item.date}</p>
                  </div>
                  <div className='mb-3 doub'>
                    <p style={{color: '#FF962E'}}>Payment Status:</p>
                    <button className={item.paymentStatus}>{item.paymentStatus}</button>
                  </div>
                  <div className='mb-3 doub'>
                    <p style={{color: '#FF962E'}}>Payment Method:</p>
                    <p>{item.paymentMethod}</p>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-7" style={{borderRight: '1px solid #FF962E', borderRadius: '20px'}}>
                    {item.productsOrdered.map((product) =>
                    <>
                      <div className="d-flex justify-content-between">
                        <p>Product Name:</p>
                        <small style={{width: '370px'}}>{product.productName}</small>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p>Product Price:</p>
                        <small>₦{product.productPrice}</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Inches:</p>
                        <small>{product.inches}</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Order Quantity:</p>
                        <small>{product.orderQuantity}</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Discounted:</p>
                        <small>{product.discounted}</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Company Name:</p>
                        <small>{product.companyName}</small>
                      </div>

                      </>
                      
                    )}
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-5">
                    <div className="d-flex justify-content-between mb-3">
                      <p>Delivery Country:</p>
                      <small style={{width: '200px'}}>{item.deliveryCountry}</small>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <p>Delivery State:</p>
                      <small style={{width: '200px'}}>{item.deliveryState}</small>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Delivery Address:</p>
                      <small style={{width: '200px'}}>{item.deliveryAddress}</small>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <p>Delivery Process:</p>
                      <button className={item.deliveryStatus}>{item.deliveryStatus}</button>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <p>Total Amount:</p>
                      <small>₦{item.totalAmountPaid}</small>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <p>Order Id:</p>
                      <small>{item.orderId}</small>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <p>Date Delivered:</p>
                      <small>{item.dateDelivered}</small>
                    </div>
                  </div>
                </div>
                {index !== currentItems.length - 1 && (
                    <hr style={{border: '1px solid #FF962E'}}/>
                )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
            </>
            
          )}

          {myValue === 'products' && (
            <div className="outer-wrapper">
              <div className="table-wrapper">
                <table className="table">
                <thead>
                  <tr>
                    <th style={{width: '250px'}}>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Discount</th>
                    <th style={{width: '250px'}}>Product Description</th>
                    <th>Product Number</th>
                    <th>Product Stock</th>
                    <th>Order Count</th>
                    <th>Product Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.length > 0 ? (
                    currentItems.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>₦{item.price}</td>
                          <td>₦{item.discount}</td>
                          <td>{item.product_description}</td>
                          <td>{item.product_number}</td>
                          <td>{item.stock}</td>
                          <td>{item.orderCount}</td>
                          <td>{item.date_added}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="2">No orders found</td>
                    </tr>
                  )}
                </tbody>
                </table>
              </div>
            </div>
            
          )}
          
          <div className='sticky-pagination'>
            {currentPage > 2 && <button 
            onClick={() => setCurrentPage(1)}
            className="mx-1"
            style={{
              backgroundColor: '#FF962E',
              borderRadius: '10px',
              border: '0',
            }}
            >1</button>}
            {currentPage > 3 && <span>...</span>}

            {Array.from({ length: totalPages }, (_, i) => {
              if (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1) {
                return (
                  <button 
                  key={i} 
                  onClick={() => setCurrentPage(i + 1)}
                  className="mx-1"
                  disabled={currentPage === i + 1}
                  style={{
                    backgroundColor: '#FF962E',
                    borderRadius: '10px',
                    border: '0',
                  }}
                  >
                    {i + 1}
                  </button>
                );
              }
              return null;
            })}

            {currentPage < totalPages - 2 && <span>...</span>}
            {currentPage < totalPages - 1 && (
              <button 
              onClick={() => setCurrentPage(totalPages)}
              className="mx-1"
              style={{
                backgroundColor: '#FF962E',
                borderRadius: '10px',
                border: '0',
              }}
              >{totalPages}</button>
            )}
          </div>

        </>
      )}
        </>
      ): ''}
      </div>

      
    </>
  )
}

export default Report
