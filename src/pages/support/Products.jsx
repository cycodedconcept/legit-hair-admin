import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchAllProducts, 
    setPage, 
    selectProducts, 
    selectCurrentPage, 
    selectTotalPages, 
    selectIsLoading, 
    selectError 
} from '../../features/allProductSlice';

const Products = () => {
    const dispatch = useDispatch();

    const products = useSelector(selectProducts);
    const currentPage = useSelector(selectCurrentPage);
    const total_pages = useSelector(selectTotalPages);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    console.log(products)


    const token = localStorage.getItem("key");

    useEffect(() => {
        if (token) {
            dispatch(fetchAllProducts({ page: currentPage, token }));
        }
    }, [dispatch, currentPage, token]);

    console.log(products)

    const handlePageChange = (page) => {
      if (page !== currentPage) {
        dispatch(setPage(page));
      }
    };

    return (
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Description</th>
                    <th>Product Number</th>
                    <th>Discounts</th>
                    <th>Total Ratings</th>
                  </tr>
                </thead>
                  <tbody>
                      {products && products.length > 0 ? (
                          products.map((product) => (
                              <tr key={product.id}>
                                  <td>
                                      <img
                                          src={product.images[0]?.filename}
                                          alt={product.product_name}
                                          width={100}
                                      />
                                  </td>
                                  <td>{product.product_name}</td>
                                  <td>{product.price}</td>
                                  <td>{product.product_description}</td>
                                  <td>{product.product_number}</td>
                                  <td>{product.discount}</td>
                                  <td>{product.total_rating}</td>
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

            {total_pages > 1 && (
              <div className="pagination">
                  {Array.from({ length: total_pages }, (_, i) => (
                      <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          disabled={currentPage === i + 1}
                      >
                          {i + 1}
                      </button>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    );
};

export default Products;
