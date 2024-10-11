import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../features/orderSlice'
import './pages.css'

const Wig = () => {

  const token = localStorage.getItem("key");
  const dispatch = useDispatch();
  const { order, currentPage, total_pages, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (token) {
      dispatch(getOrder({ page: currentPage, token }));
    }
  }, [dispatch, currentPage, token]);

  const handlePageChange = (page) => {
    dispatch(getOrder({ page, token }));
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
        ) : error ? (
            <div>Error: {error?.message || 'Something went wrong'}</div>
        ) : !order || order?.length === 0 ? ( 
            <div>No Records Found</div>
        ) : (
            <>
               {Array.isArray(order) && order.length > 0 ? (
                order.slice(0, 4).map((item, index) => 
                    <div className="row" key={index}>
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <label htmlFor=""><b>Delivery Address</b></label>
                        <p>{item.delivery_address}</p>

                        <label htmlFor=""><b>Delivery Landmark</b></label>
                        <p>{item.delivery_landmark}</p>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <label htmlFor=""><b>Delivery Date</b></label>
                        <p>{item.date}</p>
                    </div>
                    {index !== order.slice(0, 5).length - 1 && (
                        <hr style={{border: '2px solid #FF962E'}} />
                    )}
                    </div> 
                )
                ) : (
                <div>No orders found</div>
                )}


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
                      border: '0',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
            </>
        )}

        
    </>
  )
}

export default Wig
