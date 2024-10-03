import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, disableUser, getUserOrder, setOrderUsersPage } from '../features/customerSlice';


const Customer = () => {
  const [enable, setEnable] = useState(true);
  const [disable, setDisable] = useState(true);
  const [background, setBackground] = useState('all');
  const [more, setMore] = useState(true);


  const dispatch = useDispatch();
  const { 
    fetchAllUsers, 
    isLoading, 
    total_pages, 
    currentPage, 
    error, 
    user_id,
    orderUsersPage,
    orderUsersTotalPages,
    userOrders
  } = useSelector((state) => state.customers);

  let token = localStorage.getItem("key");

  useEffect(() => {
    if (token) {
      dispatch(getUsers({ token, page: currentPage }));
    }
  }, [dispatch, currentPage, token]);

  const handleButtonClick = (status) => {
    setBackground(status);  
  };

  const handlePageChange = (page) => {
    if (currentPage !== page) {
      dispatch(setPage(page));
      if (more) {
        dispatch(getUsers({ token, page: currentPage }));
      }
    }
  };

  const handleViewOrdersPageChange = (page) => {
    if (orderUsersPage !== page && id) {
      dispatch(setOrderUsersPage(page));
      dispatch(getUserOrder({ token, user_id: id, page }));
    }
  };


  const filterUser = fetchAllUsers.filter(user => {
    if (background === 'all') return true;
    if (background === 'Active') return user.account_status === 1;
    if (background === 'Blocked') return user.account_status === 0;
    return false;
  });

  const switchStatus = (id, token) => {
    console.log(id)
    if (token) {
      dispatch(disableUser({token, user_id: id}))
      .then((result) => {
        if (result.type === 'customers/disableUser/fulfilled') {
          dispatch(getUsers({ token, page: 1 }));
          Swal.fire({
            title: "Success",
            text: "User Blocked successfully!",
            icon: "success",
            button: "OK",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong while blocking a user!",
          icon: "error",
          confirmButtonText: "OK"
        });
      });
    }
  }

  const renderPagination = () => {
    if (!isLoading && total_pages > 1) {
      return (
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
                border: '0',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderViewOrdersPagination = () => {
    if (!isLoading && orderUsersTotalPages > 1) {
      return (
        <div className="pagination">
          {Array.from({ length: orderUsersTotalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handleViewOrdersPageChange(i + 1)}
              disabled={orderUsersPage === i + 1}
              className="mx-1"
              style={{
                backgroundColor: '#FF962E',
                borderRadius: '10px',
                border: '0',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  const myOrders = (id) => {
    console.log(id)
    setMore(false);
    dispatch(getUserOrder({token, user_id: id}))
  }

  const goBack = () => {
    setMore(true);
    dispatch(getUserOrder({token, user_id: id}))
  }

  return (
    <>
    {more ? (
      <>
        <div className="d-flex justify-content-between mt-2 mt-lg-4 mb-lg-4">
        <div className="sts-btn p-2">
          <button
            onClick={() => { 
                handleButtonClick('all');
                setDisable(true)
                setEnable(true)
            }}
            style={{
              backgroundColor: background === 'all' ? '#f6e7d7' : '#fff',
              color: background === 'all' ? '#FF962E' : 'black',
              border: '0',
            }}
          >
            All Customers
          </button>
          <button
            onClick={() => {
              handleButtonClick('Active');
              setDisable(true)
              setEnable(false)
            }}
            style={{
              backgroundColor: background === 'Active' ? '#f6e7d7' : '#FFF',
              color: background === 'Active' ? '#FF962E' : '#6E7079',
              border: '0',
            }}
          >
            Active
          </button>
          <button
            onClick={() => {
              handleButtonClick('Blocked');
              setDisable(false)
              setEnable(true)
            }}
            style={{
              backgroundColor: background === 'Blocked' ? '#f6e7d7' : '#FFF',
              color: background === 'Blocked' ? '#FF962E' : '#6E7079',
              border: '0',
            }}
          >
            Blocked
          </button>
        </div>
        {/* <div>
            {enable ? (
              <button className='el2-btn'>Activate</button>
            ) : ''}

            {disable ? (
              <button className='el2-btn'>Dactivate</button>
            ) : ''}
        </div> */}
        </div>

        <div className="row">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error?.message || 'Something went wrong'}</div> 
          ) : (
            <>
              {filterUser.map((fill) => (
                <div className="col-sm-12 col-md-12 col-lg-4 mb-3" key={fill.id}>
                  <div style={{ border: '1px solid #FF962E', borderRadius: '15px', padding: '10px' }}>
                    <div className="d-flex justify-content-between">
                      <label className="custom-checkbox">
                        <input type="checkbox" name="options" />
                        <span className="checkmark"></span>
                      </label>
                      <button className="el3-btn mt-3" onClick={() => myOrders(fill.id)}>view orders</button>
                    </div>
                    
                    <div className="mt-5">
                      <p style={{ marginBottom: '0rem', textAlign: 'center' }}>{fill.name}</p>
                      <p className={fill.account_status === 1 ? 'Active' : 'Blocked'} style={{ textAlign: 'center' }}>
                        {fill.account_status === 1 ? 'Active' : 'Blocked'}
                      </p>
                    </div>
                    <hr style={{borderTop: '1px dashed black'}}/>
                        <p className='text-center'>{fill.email}</p>
                        <p className='text-center'>{fill.phone_number}</p>
                        <div className='mt-3 text-left'>
                          <button onClick={() => switchStatus(fill.id, token)} className={fill.account_status === 1 ? 'deactivate' : 'activate'}>{fill.account_status === 1 ? 'Block' : 'Activate'}</button>
                        </div>
                  </div>
                </div>
                
              ))}
            </>
          )
        }
        {renderPagination()}
        </div>
      </>
    ) : (
      <>
       <div className="order-details-section">
          <div className='d-flex gap-2 mt-3'>
            <p style={{color: '#FF962E', cursor: 'pointer'}} onClick={goBack}>Customer Management</p>
            <p style={{color: '#6E7079'}}><FontAwesomeIcon icon={faCaretRight} style={{color: '#C2C6CE'}}/> View Details</p>
          </div>
          <div className="order-details">
            {isLoading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p>Error: {error.message || 'Failed to load orders'}</p>
            ) : userOrders.length > 0 ? (
                userOrders?.map((user) => (
                  <div key={user.id}>
                    <div className="d-flex justify-content-between mb-5">
                      <div className='mb-3'>
                        <p><b>Date</b></p>
                        <small>{user.date}</small>
                      </div>
                      <div>
                        <p><b>Payment Status</b></p>
                        <small>{user.payment_status}</small>
                      </div>
                      <div>
                        <p><b>Payment Method</b></p>
                        <small>{user.payment_method}</small>
                      </div>
                      <div>
                        <p><b>Delivery Status</b></p>
                        <small className={user.delivery_status}>{user.delivery_status}</small>
                      </div>
                      <div>
                        <p><b>Amount Paid</b></p>
                        <small>₦{user.amount_paid}</small>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className='d-flex justify-content-between mb-3'>
                            <p style={{color: '#FF962E'}}><b>Order Number:</b></p>
                            <small>{user.order_id}</small>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p><b>Date Delivered:</b></p>
                            <small>{user.date_delivered}</small>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p><b>Additional Information:</b></p>
                            <small>{user.additional_information}</small>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-8" style={{borderLeft: '1px solid #FF962E', padding: '10px 8px', borderRadius: '10px'}}>
                        <h5 className='text-center'><b>Delivery Information</b></h5>
                        <div className='d-flex justify-content-between mb-3'>
                          <p className='mx-2'><b>Country:</b></p>
                          <small>{user.delivery_country}</small>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                          <p className='mx-2'><b>State:</b></p>
                          <small>{user.delivery_state}</small>
                        </div>
                        <div className='d-flex justify-content-between mb-3'>
                          <p className='mx-2'><b>Address:</b></p>
                          <small>{user.delivery_address}</small>
                        </div>
                      </div>
                    </div>
                    <div className="product-section my-5">
                      <h5 className='text-center mb-3'><b>Product Details</b></h5>
                      {user.product && JSON.parse(user.product).length > 0 ? (
                        JSON.parse(user.product).map((prod, index) => 
                          <div key={index}>
                            <div className="d-flex justify-content-between">
                              <div>
                                <p><b>Product Amount</b></p>
                                <small>₦{prod.product_amount}</small>
                              </div>
                              <div>
                                <p><b>Inches</b></p>
                                <small>{prod.inches}</small>
                              </div>
                              <div>
                                <p><b>Initial Amount</b></p>
                                <small>₦{prod.initial_amount}</small>
                              </div>
                              <div>
                                <p><b>Discounted</b></p>
                                <small>{prod.discounted ? 'Yes' : 'No'}</small>
                              </div>
                              <div>
                                <p><b>Order Quantity</b></p>
                                <small>{prod.order_quantity}</small>
                              </div>
                            </div>
                          </div>
                        )
                      ) : (
                        <p className='text-center'>No product record found</p>
                      )}

                    </div>
                    <hr style={{border: '1px solid #FF962E'}}/>
                  </div>
                ))
            ) : (
              <p className='text-center'>No order available for this user.</p>
            )
          }
          </div>
          {renderViewOrdersPagination()}
       </div>
      </>
       )}
    </>
  )
}

export default Customer